package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/smtp"
	"os"
	"time"

	"github.com/joho/godotenv"
)

type RequestBody struct {
	Email string `json:"email"`
}

// ✅ Send email handler
func sendEmail(w http.ResponseWriter, r *http.Request) {
	// CORS Headers
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if err := godotenv.Load(); err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	var reqBody RequestBody
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	from := os.Getenv("GMAIL_FROM")
	password := os.Getenv("GMAIL_APP_PASSWORD")

	// 👉 verification link generated from backend
	verificationLink := fmt.Sprintf("http://localhost:8080/verify-email?email=%s", reqBody.Email)

	to := []string{reqBody.Email}
	subject := "Subject: Verify your email from Spotlight Labs 👋\n"
	body := fmt.Sprintf("Hey!\n\nClick the link below to verify your email:\n\n%s\n\nThank you!", verificationLink)
	message := []byte(subject + "\n" + body)

	smtpHost := "smtp.gmail.com"
	smtpPort := "587"
	auth := smtp.PlainAuth("", from, password, smtpHost)

	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, message)
	if err != nil {
		log.Println("Error sending email:", err)
		http.Error(w, "Failed to send email", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{
		"message": "Email sent successfully ✅",
	})
}

// ✅ Redirect to frontend on click
func verifyEmail(w http.ResponseWriter, r *http.Request) {
	email := r.URL.Query().Get("email")
	if email == "" {
		http.Error(w, "Missing email", http.StatusBadRequest)
		return
	}

	redirectURL := fmt.Sprintf("http://localhost:5173/verify?email=%s", email)
	http.Redirect(w, r, redirectURL, http.StatusFound)
}

// ✅ Actually verifies in Supabase Auth + profiles
func verifyDB(w http.ResponseWriter, r *http.Request) {
	// CORS Headers
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if err := godotenv.Load(); err != nil {
		http.Error(w, "Failed to load env", http.StatusInternalServerError)
		return
	}

	var reqBody RequestBody
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		http.Error(w, "Invalid Body request", http.StatusBadRequest)
		return
	}

	supabaseUrl := os.Getenv("SUPABASE_URL")
	serviceRoleKey := os.Getenv("SUPABASE_SERVICE_ROLE_KEY")

	if supabaseUrl == "" || serviceRoleKey == "" {
		http.Error(w, "Missing supabase config", http.StatusInternalServerError)
		return
	}

	client := &http.Client{}

	// Step 1: Get user ID from profiles table (under schema: profiles)
	reqUrl := fmt.Sprintf("%s/rest/v1/profiles?email=eq.%s&select=id", supabaseUrl, reqBody.Email)
	req1, _ := http.NewRequest("GET", reqUrl, nil)
	req1.Header.Set("apikey", serviceRoleKey)
	req1.Header.Set("Authorization", "Bearer "+serviceRoleKey)

	res1, err := client.Do(req1)
	if err != nil {
		http.Error(w, "Failed to fetch user ID", http.StatusInternalServerError)
		return
	}
	defer res1.Body.Close()

	var profile []map[string]interface{}
	json.NewDecoder(res1.Body).Decode(&profile)

	if len(profile) == 0 {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	userID := profile[0]["id"].(string)

	// Step 2: Confirm email in Supabase Auth
	authUrl := fmt.Sprintf("%s/auth/v1/admin/users/%s", supabaseUrl, userID)
	authPayload := []byte(`{"email_confirmed_at": "` + time.Now().UTC().Format(time.RFC3339) + `"}`)

	authReq, _ := http.NewRequest("PATCH", authUrl, bytes.NewBuffer(authPayload))
	authReq.Header.Set("apikey", serviceRoleKey)
	authReq.Header.Set("Authorization", "Bearer "+serviceRoleKey)
	authReq.Header.Set("Content-Type", "application/json")

	authRes, err := client.Do(authReq)
	if err != nil || authRes.StatusCode >= 400 {
		http.Error(w, "Failed to confirm email in auth", authRes.StatusCode)
		return
	}

	// Step 3: Update profiles.profiles table → is_verified: true
	updateUrl := fmt.Sprintf("%s/rest/v1/profiles?email=eq.%s", supabaseUrl, reqBody.Email)
	payload := []byte(`{"is_verified": true}`)

	req2, err := http.NewRequest(http.MethodPatch, updateUrl, bytes.NewBuffer(payload))
	if err != nil {
		http.Error(w, "Failed to create request", http.StatusInternalServerError)
		return
	}

	req2.Header.Set("apikey", serviceRoleKey)
	req2.Header.Set("Authorization", "Bearer "+serviceRoleKey)
	req2.Header.Set("Content-Type", "application/json")
	req2.Header.Set("Prefer", "return=representation")

	res2, err := client.Do(req2)
	if err != nil || res2.StatusCode >= 400 {
		http.Error(w, "Failed to update profiles", res2.StatusCode)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{
		"message": "✅ user verified in Auth & DB",
	})
}

func main() {
	http.HandleFunc("/send-email", sendEmail)
	http.HandleFunc("/verify-email", verifyEmail)
	http.HandleFunc("/verify-db", verifyDB) // 👈 Yeh line honi chahiye
	fmt.Println("🚀 Server running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

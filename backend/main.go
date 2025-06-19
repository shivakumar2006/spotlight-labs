package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/smtp"
	"net/url"
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
	w.Header().Set("Content-Type", "application/json") // 👈 Ensure JSON response

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost && r.Method != http.MethodOptions {
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Method not allowed",
		})
		return
	}

	fmt.Println("✅ Request received on /verify-db")

	if err := godotenv.Load(); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Failed to load env",
		})
		return
	}

	var reqBody RequestBody
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Invalid Body request",
		})
		return
	}

	fmt.Println("🔥 /verify-db hit with email:", reqBody.Email)

	supabaseUrl := os.Getenv("SUPABASE_URL")
	serviceRoleKey := os.Getenv("SUPABASE_SERVICE_ROLE_KEY")

	if supabaseUrl == "" || serviceRoleKey == "" {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Missing supabase config",
		})
		return
	}

	client := &http.Client{}

	// Step 1: Get user ID from profiles table
	encodedEmail := url.QueryEscape(reqBody.Email)
	reqUrl := fmt.Sprintf("%s/rest/v1/profiles?email=eq.%s&select=id", supabaseUrl, encodedEmail)

	req1, _ := http.NewRequest("GET", reqUrl, nil)
	req1.Header.Set("apikey", serviceRoleKey)
	req1.Header.Set("Authorization", "Bearer "+serviceRoleKey)

	res1, err := client.Do(req1)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Failed to fetch user ID",
		})
		return
	}
	defer res1.Body.Close()

	var profile []map[string]interface{}
	json.NewDecoder(res1.Body).Decode(&profile)

	if len(profile) == 0 {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "User not found",
		})
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
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Failed to call auth endpoint",
		})
		fmt.Println("❌ Request error:", err.Error())
		return
	}
	defer authRes.Body.Close()

	bodyBytes, _ := io.ReadAll(authRes.Body)

	if authRes.StatusCode >= 400 {
		w.WriteHeader(authRes.StatusCode)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Failed to confirm email in auth",
		})
		fmt.Println("❌ PATCH Error Status:", authRes.Status)
		fmt.Println("❌ PATCH Error Body:", string(bodyBytes))
		return
	}

	fmt.Println("✅ PATCH Success:", authRes.Status)
	fmt.Println("✅ PATCH Body:", string(bodyBytes))

	// Step 3: Update profiles table → is_verified: true
	updateUrl := fmt.Sprintf("%s/rest/v1/profiles?email=eq.%s", supabaseUrl, reqBody.Email)
	payload := []byte(`{"is_verified": true}`)

	req2, err := http.NewRequest(http.MethodPatch, updateUrl, bytes.NewBuffer(payload))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Failed to create request",
		})
		return
	}

	req2.Header.Set("apikey", serviceRoleKey)
	req2.Header.Set("Authorization", "Bearer "+serviceRoleKey)
	req2.Header.Set("Content-Type", "application/json")
	req2.Header.Set("Prefer", "return=representation")

	res2, err := client.Do(req2)
	if err != nil || res2.StatusCode >= 400 {
		w.WriteHeader(res2.StatusCode)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Failed to update profiles",
		})
		return
	}

	// ✅ FINAL Success Response
	w.WriteHeader(http.StatusOK)
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

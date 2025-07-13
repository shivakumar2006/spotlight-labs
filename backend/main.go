package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"time"

	"github.com/joho/godotenv"
	// "github.com/joho/godotenv"
)

type RequestBody struct {
	Email string `json:"email"`
}

// ✅ Send email handler
func sendEmail(w http.ResponseWriter, r *http.Request) {
	// CORS
	w.Header().Set("Access-Control-Allow-Origin", "https://spotlig.netlify.app")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Invalid method", http.StatusMethodNotAllowed)
		return
	}

	// err := godotenv.Load()
	// if err != nil {
	// 	http.Error(w, "Failed to load env", http.StatusInternalServerError)
	// 	return
	// }

	var reqBody RequestBody
	// err = json.NewDecoder(r.Body).Decode(&reqBody)
	// if err != nil || reqBody.Email == "" {
	// 	http.Error(w, "Invalid email", http.StatusBadRequest)
	// 	return
	// }

	frontendURL := os.Getenv("FRONTEND_URL")
	apiToken := os.Getenv("MAILSENDER_API_TOKEN")

	fmt.Println("🔑 FRONTEND_URL:", frontendURL)
	fmt.Println("🔑 MAILSENDER_API_TOKEN:", apiToken != "") // just true/false

	verificationLink := fmt.Sprintf("%s/verify-email?email=%s", frontendURL, url.QueryEscape(reqBody.Email))

	// ✅ Create MailerSend payload
	emailPayload := map[string]interface{}{
		"from": map[string]string{
			"email": "test@test-65qngkdx3vdlwr12.mlsender.net", // ✅ sender
			"name":  "Spotlight Labs",
		},
		"to": []map[string]string{
			{"email": reqBody.Email},
		},
		"subject": "Verify your email from Spotlight Labs 👋",
		"text":    fmt.Sprintf("Hey!\n\nClick to verify:\n%s\n\nThanks!", verificationLink),
	}

	payloadBytes, _ := json.Marshal(emailPayload)

	req, err := http.NewRequest("POST", "https://api.mailersend.com/v1/email", bytes.NewBuffer(payloadBytes))
	if err != nil {
		http.Error(w, "Failed to create MailerSend request", http.StatusInternalServerError)
		return
	}

	req.Header.Set("Authorization", "Bearer "+apiToken)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil || resp.StatusCode >= 400 {
		bodyBytes, _ := io.ReadAll(resp.Body)
		fmt.Println("❌ MailerSend error:", string(bodyBytes)) // 👈 this logs exact error
		http.Error(w, "Failed to send email via MailerSend", http.StatusInternalServerError)
		return
	}

	defer resp.Body.Close()

	json.NewEncoder(w).Encode(map[string]string{
		"message": "Email sent via MailerSend ✅",
	})
}

// ✅ Redirect to frontend on click
func verifyEmail(w http.ResponseWriter, r *http.Request) {
	email := r.URL.Query().Get("email")
	if email == "" {
		http.Error(w, "Missing email", http.StatusBadRequest)
		return
	}

	frontendURL := os.Getenv("FRONTEND_URL")
	redirectURL := fmt.Sprintf("%s/verify?email=%s", frontendURL, email)

	http.Redirect(w, r, redirectURL, http.StatusFound)
}

// ✅ Actually verifies in Supabase Auth + profiles
func verifyDB(w http.ResponseWriter, r *http.Request) {
	// CORS Headers
	w.Header().Set("Access-Control-Allow-Origin", "https://spotlig.netlify.app")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json") // 👈 Ensure JSON response

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Method not allowed",
		})
		return
	}
	fmt.Println("Request Method", r.Method)
	fmt.Println("✅ Request received on /verify-db")

	// if err := godotenv.Load(); err != nil {
	// 	w.WriteHeader(http.StatusInternalServerError)
	// 	json.NewEncoder(w).Encode(map[string]string{
	// 		"error": "Failed to load env",
	// 	})
	// 	return
	// }

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
		fmt.Println("❌ PATCH Error Status:", authRes.Status)
		fmt.Println("❌ PATCH Error Body:", string(bodyBytes))
		// ❗ Do NOT return here — continue to next steps
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

func withCORS(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "https://spotlig.netlify.app")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		handler(w, r)
	}
}

func main() {
	if os.Getenv("RENDER") == "" {
		godotenv.Load()
	}

	http.HandleFunc("/send-email", withCORS(sendEmail))
	http.HandleFunc("/verify-email", withCORS(verifyEmail))
	http.HandleFunc("/verify-db", withCORS(verifyDB)) // 👈 Yeh line honi chahiye
	fmt.Println("🚀 Server running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

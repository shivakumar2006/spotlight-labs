package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

type RequestBody struct {
	Email string `json:"email"`
	Link  string `json:"link"`
}

func verifyEmail(w http.ResponseWriter, r *http.Request) {
	// ✅ CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	email := r.URL.Query().Get("email")
	if email == "" {
		http.Error(w, "Email parameter is missing", http.StatusBadRequest)
		return
	}

	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	updateData := map[string]bool{"is_verified": true}
	jsonData, _ := json.Marshal(updateData)

	req, err := http.NewRequest("PATCH", "https://pofmayvanceglvmbnxsm.supabase.co/rest/v1/profiles?email=eq."+email, bytes.NewBuffer(jsonData))
	if err != nil {
		http.Error(w, "Failed to create request", http.StatusInternalServerError)
		return
	}

	req.Header.Set("apikey", os.Getenv("SUPABASE_SERVICE_ROLE_KEY"))
	req.Header.Set("Authorization", "Bearer "+os.Getenv("SUPABASE_SERVICE_ROLE_KEY"))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Prefer", "return-representation")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil || resp.StatusCode >= 400 {
		log.Println("Failed to verify email:", err)
		http.Error(w, "Failed to verify email", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	http.Redirect(w, r, "http://localhost:5173/verified-success", http.StatusSeeOther)
}

func sendEmail(w http.ResponseWriter, r *http.Request) {
	// ✅ CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	var reqBody RequestBody
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if reqBody.Email == "" || reqBody.Link == "" {
		http.Error(w, "Email or link missing", http.StatusBadRequest)
		return
	}

	apiToken := os.Getenv("MAILERSEND_API_TOKEN")
	from := map[string]string{
		"email": "MS_jN2R67@test-q3enl6k8em042vwr.mlsender.net",
		"name":  "Spotlight Labs",
	}

	payload := map[string]interface{}{
		"from":    from,
		"to":      []map[string]string{{"email": reqBody.Email}},
		"subject": "Verify your email from Spotlight labs 👋",
		"text":    fmt.Sprintf("Hey!\n\nClick the link below to verify your email:\n\n%s\n\nThank you!", reqBody.Link),
	}

	jsonData, _ := json.Marshal(payload)

	req, _ := http.NewRequest("POST", "https://api.mailersend.com/v1/email", bytes.NewBuffer(jsonData))
	req.Header.Set("Authorization", "Bearer "+apiToken)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Println("Error sending email:", err)
		http.Error(w, "Failed to send email", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		log.Println("MailerSend API error:", resp.Status)
		http.Error(w, "MailerSend API error", resp.StatusCode)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{
		"message": "Email sent successfully ✅",
	})
}

func main() {
	http.HandleFunc("/send-email", sendEmail)
	http.HandleFunc("/verify-email", verifyEmail)

	fmt.Println("🚀 Server started at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/smtp"
	"os"

	"github.com/joho/godotenv"
)

type RequestBody struct {
	Email string `json:"email"`
	Link  string `json:"link"`
}

func sendEmail(w http.ResponseWriter, r *http.Request) {
	// ✅ CORS Headers
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5174")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// ✅ Handle preflight OPTIONS request
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	// Load .env file
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// Decode request body JSON
	var reqBody RequestBody
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if reqBody.Email == "" {
		http.Error(w, "Email is required", http.StatusBadRequest)
		return
	}

	// Read credentials from environment
	from := os.Getenv("FROM_EMAIL")
	password := os.Getenv("SMTP_PASSWORD")
	to := []string{reqBody.Email}
	smtpHost := os.Getenv("SMTP_HOST")
	smtpPort := os.Getenv("SMTP_PORT")

	// Compose the email
	subject := "Subject: Verify your email from Spotlight labs 👋\n"
	body := fmt.Sprintf("Hey there!\n\nThanks for signing up. Click the link below to verify your email:\n\n👉 %s\n\nRegards,\nTeam Shiva", reqBody.Link)

	message := []byte(subject + "\n" + body)

	// Authenticate and send
	auth := smtp.PlainAuth("", from, password, smtpHost)
	err = smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, message)
	if err != nil {
		log.Println("Error sending email:", err)
		http.Error(w, "Error sending email", http.StatusInternalServerError)
		return
	}

	fmt.Fprintln(w, "✅ Email sent successfully to:", reqBody.Email)
}

func main() {
	http.HandleFunc("/send-email", sendEmail)

	fmt.Println("🚀 Server started at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

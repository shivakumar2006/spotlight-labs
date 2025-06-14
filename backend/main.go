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

	to := []string{reqBody.Email}
	subject := "Subject: Verify your email from Spotlight Labs 👋\n"
	body := fmt.Sprintf("Hey!\n\nClick the link below to verify your email:\n\n%s\n\nThank you!", reqBody.Link)
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

// ✅ Verify redirect handler
func verifyEmail(w http.ResponseWriter, r *http.Request) {
	email := r.URL.Query().Get("email")
	if email == "" {
		http.Error(w, "Missing email", http.StatusBadRequest)
		return
	}

	// 👇 Redirect to frontend
	redirectURL := fmt.Sprintf("http://localhost:5173/verify?email=%s", email)
	http.Redirect(w, r, redirectURL, http.StatusFound)
}

func main() {
	http.HandleFunc("/send-email", sendEmail)
	http.HandleFunc("/verify-email", verifyEmail)

	fmt.Println("🚀 Server running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

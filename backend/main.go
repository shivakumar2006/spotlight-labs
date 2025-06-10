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

func sendEmail(w http.ResponseWriter, r *http.Request) {
	// CORS
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

	apiToken := os.Getenv("MAILERSEND_API_TOKEN")
	from := map[string]string{
		"email": "MS_jN2R67@test-q3enl6k8em042vwr.mlsender.net",
		"name":  "Spotlight Labs",
	}

	payload := map[string]interface{}{
		"from":    from,
		"to":      []map[string]string{{"email": reqBody.Email}},
		"subject": "Verify your email from Spotlight labs 👋",
		"text":    fmt.Sprintf("Hey! Click below to verify your email:\n\n%s", reqBody.Link),
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

	"text": fmt.Sprintf("Hey!\n\nClick the link below to verify your email:\n\nhttp://localhost:5173/verify?email=%s\n\nThank you!", reqBody.Email),

}

func main() {
	http.HandleFunc("/send-email", sendEmail)

	fmt.Println("🚀 Server started at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

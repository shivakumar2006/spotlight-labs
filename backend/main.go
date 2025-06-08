package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/resendlabs/resend-go"
)

func main() {
	// load enviroment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading in env file")
	}

	r := gin.Default()
	r.Use(cors.Default())

	r.POST("send/email", func(c *gin.Context) {
		type RequestBody struct {
			Email string `json:"email"`
			Link  string `json:"link"`
		}

		var body RequestBody
		if err := c.ShouldBindJSON(&body); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid body"})
			return
		}

		apiKey := os.Getenv("RESEND_API_KEY")
		if apiKey == "" {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "API key is not found"})
			return
		}

		client := resend.NewClient(apiKey)
		params := &resend.SendEmailRequest{
			From:    "onboarding@resend.dev",
			To:      []string{body.Email},
			Subject: "Confirm your signup",
			Html:    fmt.Sprintf("<h2>Confirm your account</h2><p><a href='%s'>Click here to verify</a></p>", body.Link),
		}

		_, err := client.Emails.Send(params)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Email sent successfully"})
	})
	r.Run(":8080")
}

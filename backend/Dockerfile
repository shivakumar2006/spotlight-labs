# Stage 1: Build stage
FROM --platform=linux/amd64 golang:1.23.4 AS builder

WORKDIR /app

COPY . .

RUN go mod tidy

# ✅ Build the binary for Linux environment
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main .

# Stage 2: Minimal image with binary only
FROM debian:bullseye-slim

WORKDIR /app

COPY --from=builder /app/main .

EXPOSE 8080

CMD ["./main"]

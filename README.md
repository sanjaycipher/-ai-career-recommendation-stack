# AI Career Recommendation Stack — Phase 1

This repository contains Phase 1 of the **AI Career Recommendation Stack**.

In this phase, we establish the project scaffolding, the MySQL 8 and phpMyAdmin containerized database services via Docker Compose, and a fully functional Express.js backend with Sequelize ORM and JWT authentication.

---

## Architecture Overview (Phase 1)

```
ai-career-recommender/
├── client/              # Frontend placeholder (React + Vite + MUI in Phase 5)
├── server/              # Express + Sequelize + MySQL + JWT Authentication
├── ml-service/          # Scoring service placeholder (FastAPI in Phase 3)
├── docker-compose.yml   # MySQL 8 & phpMyAdmin definitions
├── .env.example         # Root environment example (DB credentials)
├── .gitignore
└── README.md
```

---

## Prerequisites

1. **Node.js**: v20 or higher installed.
2. **Docker Desktop**: Installed and running on Windows.
3. **PowerShell** or Command Prompt.

---

## Quickstart Guide

### 1. Start Database Containers

From the repository root directory (`P:\ai-career-recommender`):

```powershell
# Copy the root environment file (optional reference)
Copy-Item .env.example .env

# Launch MySQL and phpMyAdmin containers in background
docker compose up -d
```

Verify containers are running:

```powershell
docker compose ps
```

- **MySQL Port**: `3307` (mapped to container internal port `3306`)
- **phpMyAdmin Web UI**: [http://localhost:8081](http://localhost:8081)
  - Username: `career_user`
  - Password: `career_pass`
  - Database: `career_db`

---

### 2. Configure and Run Express Server

Navigate to the `server` directory:

```powershell
cd server
```

Create your `.env` configuration file from the provided `.env.example`:

```powershell
Copy-Item .env.example .env
```

Install server dependencies:

```powershell
npm install
```

Start the development server with live reload (`nodemon`):

```powershell
npm run dev
```

Or run in standard production mode:

```powershell
npm start
```

The server starts at:
- **API Base**: [http://localhost:5000](http://localhost:5000)
- **Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## API Endpoints (Phase 1)

All API responses adhere to the standard shape:
- **Success**: `{ "success": true, "data": { ... } }`
- **Error**: `{ "success": false, "error": "message" }`

### 1. Health Check
- **Route**: `GET /api/health`
- **Description**: Verifies service status.
- **Example Response**:
  ```json
  {
    "success": true,
    "data": {
      "status": "healthy",
      "service": "career-recommender-server",
      "timestamp": "2026-10-29T12:00:00.000Z",
      "environment": "development"
    }
  }
  ```

### 2. Register User
- **Route**: `POST /api/auth/register`
- **Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "securepassword123",
    "role": "student"
  }
  ```
- **Example Response**:
  ```json
  {
    "success": true,
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5...",
      "user": {
        "id": 1,
        "name": "Jane Doe",
        "email": "jane@example.com",
        "role": "student",
        "created_at": "2026-10-29T12:00:00.000Z",
        "updated_at": "2026-10-29T12:00:00.000Z"
      }
    }
  }
  ```

### 3. Login User
- **Route**: `POST /api/auth/login`
- **Body**:
  ```json
  {
    "email": "jane@example.com",
    "password": "securepassword123"
  }
  ```
- **Example Response**:
  ```json
  {
    "success": true,
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5...",
      "user": {
        "id": 1,
        "name": "Jane Doe",
        "email": "jane@example.com",
        "role": "student",
        "created_at": "2026-10-29T12:00:00.000Z",
        "updated_at": "2026-10-29T12:00:00.000Z"
      }
    }
  }
  ```

### 4. Get Current User Profile (Protected)
- **Route**: `GET /api/auth/me`
- **Header**: `Authorization: Bearer <token>`
- **Example Response**:
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": 1,
        "name": "Jane Doe",
        "email": "jane@example.com",
        "role": "student",
        "created_at": "2026-10-29T12:00:00.000Z",
        "updated_at": "2026-10-29T12:00:00.000Z"
      }
    }
  }
  ```

---

## Testing with PowerShell

You can verify the endpoints directly in PowerShell:

```powershell
# 1. Test Health
Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method GET

# 2. Register
$body = @{ name = "Jane Doe"; email = "jane@example.com"; password = "password123" } | ConvertTo-Json
$registerRes = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -Body $body -ContentType "application/json"
$token = $registerRes.data.token

# 3. Access Protected /api/auth/me
$headers = @{ Authorization = "Bearer $token" }
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/me" -Method GET -Headers $headers
```

---

## Stopping the Database

To stop the Docker containers when done:

```powershell
docker compose down
```
To remove database volumes completely:
```powershell
docker compose down -v
```

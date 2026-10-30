# 🧭 CareerCompass — AI Career Recommendation Stack

An end-to-end, intelligent career guidance platform designed to analyze a student's skills, academic background, interests, and preferred experience to deliver ranked, calibrated career recommendations with radar visualization and actionable skill gap summaries.

---

## 🏛️ Architecture Overview

The system is architected as a decoupled, multi-tier microservices stack designed for high cohesion, rapid development, and clear separation of concerns:

```
[ Frontend: React + Vite + MUI (Port 5173) ]
                    │
                    ▼  (REST / JWT Bearer)
[ Backend: Node.js Express + Sequelize (Port 5000) ]
        │                               │
        ▼ (MySQL Dialect)               ▼ (Internal HTTP)
[ Database: MySQL 8 (Port 3307) ]   [ ML Service: Python FastAPI (Port 8000) ]
```

1. **Client Tier (`client/`)**: Modern React 18 single-page application built on Vite and Material UI (MUI v5). Features multi-select searchable chip inputs, interactive Recharts radar charts, responsive drawer navigation, and JWT-authenticated session persistence.
2. **Gateway & API Tier (`server/`)**: Express.js REST API with Sequelize ORM. Handles user authentication, token lifecycle, database migrations and seeding, request validation, transaction management, and orchestrates calls to the ML engine.
3. **ML Scoring Service (`ml-service/`)**: High-performance Python FastAPI service. Computes deterministic, rule-based career match scores, ranks 28 tech professions, categorizes recommendations into actionable tiers, and identifies core versus secondary skill gaps.
4. **Data Tier (`Docker / MySQL 8`)**: Relational database with 9 relational tables modeling students, master skills, academic subjects, career profiles, junction weight tables, and immutable recommendation history runs.

---

## 💻 Tech Stack

- **Frontend**: React 18, Vite, Material UI (MUI v5), Recharts, React Router v6, Axios
- **Backend**: Node.js, Express.js, Sequelize ORM, JWT (jsonwebtoken), bcryptjs
- **Machine Learning & Scoring**: Python 3.11, FastAPI, Uvicorn, Pydantic v2
- **Database & DevOps**: MySQL 8, phpMyAdmin, Docker & Docker Compose

---

## 📸 Screenshots

| Dashboard & History Overview | Intelligent Recommendation Form |
| :---: | :---: |
| ![Dashboard Screenshot](https://via.placeholder.com/600x340.png?text=Dashboard+%26+Live+Stats) | ![Recommend Form Screenshot](https://via.placeholder.com/600x340.png?text=Skill+%26+Interest+Selector) |

| Career Match Hero & Radar Analytics | Complete 28-Career Ranking Table |
| :---: | :---: |
| ![Career Results Screenshot](https://via.placeholder.com/600x340.png?text=Top+Career+Matches+%26+Radar+Chart) | ![Full Table Screenshot](https://via.placeholder.com/600x340.png?text=Sortable+28-Career+Matrix) |

---

## ⚙️ How the Scoring Algorithm Works

The recommendation engine employs a calibrated multi-attribute rule-based model that evaluates a student's profile across four core pillars: **Skills (60% weight)**, **Interests (15% weight)**, **Academic Subjects (15% weight)**, and **Work Experience Level (10% weight)**. Skill matches are weighted heavily toward critical requirements (weights $\ge 2.5$) with an additional Core Mastery Bonus awarded when students possess foundational technologies for a role. To mirror realistic junior hiring standards without demoralizing students, final scores are calibrated into three distinct tiers: **Strong Match** ($\ge 65\%$), **Moderate Match** ($45\% - 64.9\%$), and **Explore** ($< 45\%$), with a calibrated 15% UX baseline floor. Each career evaluation automatically extracts a **Gap Summary** isolating critical missing core requirements from secondary nice-to-have tools.

---

## 🚀 Local Development Setup

### 1. Prerequisites
- **Node.js**: v20 or higher
- **Python**: v3.11 or higher
- **Docker Desktop**: Running locally

---

### 2. Start the Database
From the repository root:
```powershell
# Start MySQL 8 and phpMyAdmin
docker compose up -d

# Verify container status
docker compose ps
```
- **MySQL Host/Port**: `127.0.0.1:3307`
- **phpMyAdmin UI**: [http://localhost:8081](http://localhost:8081) (`career_user` / `career_pass`)

---

### 3. Start the ML Service
In a new terminal:
```powershell
cd ml-service

# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Run FastAPI server on port 8000
python run.py
```
- **API URL**: [http://localhost:8000](http://localhost:8000)
- **Interactive OpenAPI Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### 4. Start the Express Backend
In a new terminal:
```powershell
cd server

# Install dependencies
npm install

# Seed the database (87 skills, 28 careers, 298 career skills, etc.)
npm run db:seed

# Start development server
npm run dev
```
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

### 5. Start the React Frontend
In a new terminal:
```powershell
cd client

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
- **Frontend App**: [http://localhost:5173](http://localhost:5173)

---

### 6. Verify System Health
You can verify that all services are operational at any time by running the included PowerShell test script from the project root:
```powershell
.\verify.ps1
```

---

## 📡 API Reference

All backend endpoints return responses adhering to the `{ success: boolean, data?: any, error?: string }` envelope contract.

| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `GET` | `/api/health` | None | Service health status check |
| `POST` | `/api/auth/register` | None | Register new student account (`name`, `email`, `password`) |
| `POST` | `/api/auth/login` | None | Authenticate student and issue 7-day JWT Bearer token |
| `GET` | `/api/auth/me` | Bearer | Retrieve authenticated user profile |
| `GET` | `/api/meta/options` | Bearer | Master list of skills (87), interests (10), subjects (12), & experience |
| `POST` | `/api/recommend` | Bearer | Run ML scoring algorithm on student payload & persist results |
| `GET` | `/api/recommendations` | Bearer | Paginated recommendation history with top career and match percentage |
| `GET` | `/api/recommendations/:id` | Bearer | Full results, radar metrics, and gap breakdown for a specific run |

---

## 🔒 Security & Environment Variables

Make sure you do **NOT** commit private credentials or secrets to version control. Always copy the provided `.env.example` templates to `.env` in the root, `server/`, and `client/` directories:
- `JWT_SECRET`: Use a strong, cryptographically secure 256-bit string in production.
- `DB_PASSWORD`: Ensure default database credentials are changed for staging/production environments.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

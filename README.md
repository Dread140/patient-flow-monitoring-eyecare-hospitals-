# 👁 Smart Eye Hospital Patient Flow Management System

A working prototype for monitoring outpatient (OPD) patient movement in eye hospitals.

## 📌 Problem Statement

Eye hospitals often face high OPD volumes and bottlenecks across multiple stages:

- Vision Test → Imaging → Consultation → Treatment
- Limited ophthalmologists and diagnostic equipment (OCT, Fundus Camera, Slit Lamp)
- No centralized visibility for queue and resource management

This contributes to long wait times, specialist overload, and inconsistent equipment usage.

## ✅ Implemented Flow (as requested)

This app now follows the exact flow:

1. **Staff Login**
2. **Patient Registration (shown immediately after login)**
3. **Monitoring Dashboard** (queue, stage chart, resources)

## 💡 What this prototype includes

- Login-gated access using session token (`x-session-token`)
- Digital token-based patient registration (after login)
- Queue and stage metrics
- Resource monitoring (doctor/equipment status + utilization)
- Dashboard visualizations using Chart.js

## 🛠 Tech Stack

- Backend: Node.js + Express
- Database: SQLite
- Frontend: HTML/CSS/JS dashboard
- Visualization: Chart.js

## 📁 Project Structure

- `src/server.js` — Express server + auth + REST APIs
- `src/db.js` — SQLite schema, seed data, and data access
- `public/index.html` — login/registration/monitoring UI
- `data/patient-flow.db` — SQLite DB file (created at runtime)

## 🚀 Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start server:

```bash
npm start
```

3. Open:

```text
http://localhost:3000
```

## 🔐 Demo Login

- Username: `admin`
- Password: `admin123`
- Override with env vars:
  - `DEMO_USERNAME`
  - `DEMO_PASSWORD`

## 🔌 API Endpoints

- `GET /api/health` — service health
- `POST /api/login` — login `{ username, password }` and get token
- `POST /api/logout` — logout current token
- `GET /api/me` — current session user
- `GET /api/patients` — list patients (auth required)
- `POST /api/patients` — create patient `{ name, age, priority }` (auth required)
- `PATCH /api/patients/:id` — update patient stage/status (auth required)
- `GET /api/resources` — list doctors/equipment (auth required)
- `GET /api/metrics` — dashboard metrics (auth required)

## 🧪 Sample User Journey

1. Login with staff credentials.
2. Land on the **Registration** tab directly.
3. Register one or more patients.
4. Open **Monitoring** tab to track queue metrics and resources.

## 📌 Hackathon Focus

Sankara Innovation Challenge 2026 — improving operational efficiency in eye hospitals.

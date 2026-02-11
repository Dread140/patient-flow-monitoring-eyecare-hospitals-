# 👁 Smart Eye Hospital Patient Flow Management System

A working prototype for monitoring outpatient (OPD) patient movement in eye hospitals.

## 📌 Problem Statement

Eye hospitals often face high OPD volumes and bottlenecks across multiple stages:

- Vision Test → Imaging → Consultation → Treatment
- Limited ophthalmologists and diagnostic equipment (OCT, Fundus Camera, Slit Lamp)
- No real-time visibility for queue and resource management

This contributes to long wait times, specialist overload, and inconsistent equipment usage.

## 💡 What this prototype includes

This repository now contains a runnable **Node.js + SQLite + dashboard** implementation with:

- Real-time patient queue tracking (status + stage)
- Digital token-based patient registration
- Stage-wise metrics and queue summary
- Resource monitoring (doctor/equipment status + utilization)
- Dashboard visualizations using Chart.js

## 🛠 Tech Stack

- Backend: Node.js + Express
- Database: SQLite
- Frontend: HTML/CSS/JS dashboard
- Visualization: Chart.js

## 📁 Project Structure

- `src/server.js` — Express server and REST API
- `src/db.js` — SQLite schema, seed data, and data access
- `public/index.html` — live dashboard UI
- `data/patient-flow.db` — SQLite DB file (created at runtime)

## 🚀 Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

3. Open:

```text
http://localhost:3000
```

## 🔌 API Endpoints

- `GET /api/health` — service health
- `GET /api/patients` — list patients
- `POST /api/patients` — create patient `{ name, age, priority }`
- `PATCH /api/patients/:id` — update patient stage/status
- `GET /api/resources` — list doctors/equipment
- `GET /api/metrics` — dashboard metrics

## 🧪 Sample Workflow

- Register patients from the dashboard form.
- See queue counters and stage chart update.
- Monitor doctor and equipment utilization in real time.

## 🔮 Future Scope

- AI-based bottleneck prediction
- Multi-branch monitoring
- HIS integration
- Doctor mobile app
- Automated appointment optimization

## 📌 Hackathon Focus

Sankara Innovation Challenge 2026 — improving operational efficiency in eye hospitals.

# patient-flow-monitoring-eyecare-hospitals-
# 👁 Smart Eye Hospital Patient Flow Management System

## 📌 Problem Statement

Eye hospitals experience high outpatient (OPD) volumes and workflow bottlenecks due to:

- Multiple diagnostic stages (Vision Test → Imaging → Consultation)
- Limited ophthalmologists
- Expensive diagnostic equipment (OCT, Fundus Camera, Slit Lamp)
- No real-time visibility of patient flow

This results in:
- Long waiting times
- Specialist overload
- Equipment under/over-utilization
- Patient dissatisfaction



## 💡 Solution Overview

A real-time digital platform designed specifically for eye hospitals to monitor patient movement, optimize resource allocation, and prevent overcrowding before it happens.

The system provides live visibility across:

Patient → Vision Test → Imaging → Doctor → Treatment


## 🚀 Key Features

### 1️⃣ Real-Time Patient Flow Tracking
- Live patient status (Waiting / In Test / With Doctor / Completed)
- Stage-wise tracking
- Queue position monitoring
- Delay alerts for bottlenecks

### 2️⃣ OPD Queue Management
- Digital token generation
- Automated prioritization (Emergency / Elderly)
- Estimated waiting time calculation
- Dynamic queue reallocation

### 3️⃣ Resource Monitoring
- Doctor availability tracking
- Diagnostic equipment status monitoring
- Room/chair occupancy tracking
- Smart redistribution suggestions

### 4️⃣ Live Dashboard & Heatmap
- Department-wise congestion visualization
- Patient load graphs
- Equipment utilization charts
- Real-time alerts

### 5️⃣ Analytics & Reporting
- Average waiting time reports
- Equipment usage analytics
- Patient throughput metrics
- Daily/weekly performance insights



## 🏗 System Architecture

Patient / Staff Interface  
↓  
Data Collection Layer  
↓  
Central Processing Engine  
↓  
Decision & Alert Engine  
↓  
Dashboard & Admin View  



## 🛠 Technology Stack

Frontend:
- React.js

Backend:
- Node.js 

Database:
- SQlite


Visualization:
- Chart.js 

Deployment:
- Cloud-based architecture



## 📊 Expected Impact

- Waiting Time Reduced by ~30%
- Equipment Idle Time Reduced by ~25%
- Patient Throughput Increased by ~20%
- Improved Ophthalmologist Efficiency


## 🔬 Innovation Edge

- Designed specifically for eye hospital workflows
- Equipment-level tracking (OCT, Fundus Camera, Slit Lamp)
- Protects specialist time
- Prevents overcrowding before escalation
- Low-cost, scalable implementation
- No additional hardware required

Unlike generic hospital management systems, this solution is ophthalmology-focused and workflow-specific.


## ⚙ Prototype Status

- UI dashboard mockups completed
- Workflow architecture finalized
- Real-time flow logic designed
- Pilot-ready system model


## ⚠ Risks & Mitigation

| Risk | Mitigation |
|------|------------|
| Staff resistance | Training & onboarding |
| Data entry errors | Partial automation |
| System downtime | Cloud backup |
| Data privacy concerns | Role-based secure access |


## 👥 Team

Project Lead – System Architecture & Workflow Design  
Frontend Developer – Dashboard & UI Development  
Backend Developer – Data Logic & Analytics Engine  

“Our team combines system design, UI development, and backend analytics expertise to deliver a complete and scalable eye-care workflow solution.”


## 🔮 Future Scope

- AI-based bottleneck prediction
- Multi-branch monitoring
- HIS integration
- Doctor mobile app
- Automated appointment optimization

flow of the app
1. Login Page

Purpose:
Authenticate staff (admin, receptionist, optometrist, doctor).

Functions:

Accept username/password

Role-based navigation (admin vs staff vs doctors)

Navigation:
→ Dashboard

📌 2. Hospital Dashboard

Purpose:
Central overview of hospital status.

Shows:

Total patients in hospital

Patients waiting per stage

Emergency cases flagged

Doctor / room availability

Alerts for crowding or bottlenecks

Functions:

Real-time counts

Links to sub-pages

Hospital operational summary

Navigation Options:
→ Patient Registration
→ Pre-check Queues
→ Diagnostics
→ Consultation List

📌 3. Patient Registration Page

Purpose:
Record patient details and generate identity (MRN).

Functions:

Collect basic patient info (name, age, contact)

Issue unique patient ID

Tag visit type (OPD, follow-up, emergency)

Assign token number displayed on TV

Mark patient as “Registered”

Navigation:
→ Pre-Check

📌 4. Pre-Check / Screening Page

Purpose:
Perform initial eye screening before doctor exam.

Typical Tests:

Vision check (refraction)

Eye pressure

Basic examination

Functions:

Mark tests done

Update patient status to “Pre-check done”

Route patient accordingly

Navigation:
→ Diagnostics (if needed)
→ Consultation

📌 5. Diagnostics Page

Purpose:
Handle specialized tests often required in eye care:

OCT scans

Fundus imaging

Cornea checks

Lab tests

Functions:

Queue patients for specific tests

Show room/diagnostic device availability

Update test results when done

Navigation:
→ Consultation

📌 6. Doctor Consultation Page

Purpose:
Ophthalmologist reviews patient and clinical data.

Functions:

Show patient history & test results

Add diagnosis and treatment plan

Mark patient as “Consulted”

Route to next step (treatment/surgery/pharmacy)

Navigation:
→ Treatment / Pharmacy / Counselling

📌 7. Treatment / Surgery / Pharmacy Page

Purpose:
Handle final stages after consultation.

Treatment Types:

Medication prescription

Surgical appointment

Optical prescription

Pharmacy pickup

Functions:

Schedule or mark treatment done

Show available OTP / OR slots

Direct to pharmacy (for medication)

Navigation:
→ Follow-up or Exit

📌 8. Follow-Up / Exit Page

Purpose:
Finalize visit and schedule next appointment if needed.

Functions:

Capture follow-up date

Save electronic medical record

Provide visit summary


## 🎯 Final Goal

To transform eye hospitals into intelligent, data-driven, patient-friendly care systems that reduce waiting time, optimize specialist usage, and improve overall clinical efficiency.


## 📌 Hackathon Project

Sanakara Innovation Challenge 2026 – Focused on improving operational efficiency in eye hospitals.

# 🩺 DocSpot: Seamless Appointment Booking for Health

**DocSpot** is a full-stack healthcare appointment booking system. It offers an intuitive interface for users to register, apply as doctors, and book appointments, while providing administrators with tools to manage users and doctor approvals effectively.

---

## 🚀 Features

### ✅ User Features
- 🔐 Secure registration and login (JWT-based)
- 📝 Apply to become a doctor
- 📅 Book appointments with approved doctors
- 📋 View personal appointment history

### 👨‍⚕️ Doctor Features
- 🔐 Login and view dashboard
- 📋 View appointments booked with them

### 🛠️ Admin Features
- 👥 View all registered users
- 🧑‍⚕️ View doctor applications (pending/approved)
- ✅ Approve or ❌ reject doctor applications
- 🔄 Update doctor status dynamically

---
🚀 Live Demo  
[Click to View on Google Drive](https://drive.google.com/file/d/1H6pidUS_lh7-nKZdeW5KA_ryaJh1fGvE/view?usp=drive_link)

---
## 🧱 Tech Stack

**Frontend:**
- HTML5, CSS3 (Dark theme & Gradient styling)
- JavaScript (Vanilla JS)

**Backend:**
- Node.js + Express.js
- MongoDB (Mongoose ODM)
- JWT Authentication
- RESTful API Architecture

---

## 📂 Folder Structure

```

docspot/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── doctor-apply.html
│   ├── admin.html
│   ├── appointments.html
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── auth.js
│       ├── dashboard.js
│       ├── doctor.js
│       ├── admin.js
│       └── appointments.js
├── .env
├── package.json
├── index.js
└── README.md

````

---

## ⚙️ Setup Instructions


### 🔐 Admin Login

1. Register a user via `register.html`
2. Manually update their `type` to `"admin"` in your MongoDB collection
3. Login with that user on `login.html`

### 👨‍⚕️ Doctor Flow

1. Register a user
2. Apply via `doctor-apply.html`
3. Login as admin and approve the doctor in `admin.html`
4. Login as that doctor to view appointments

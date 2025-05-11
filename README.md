# 🏥 Patient Registration App

Frontend-only app to register patients using in-browser database storage with Pglite. Built using Vite + React.

---

## 🚀 Features

- Register patients with name, age, gender, DOB, and contact
- Validates inputs (age > 0, all fields required)
- Stores data using Pglite (SQLite-compatible engine in the browser)
- Persists data using IndexedDB
- Modular form component

---

## 🛠️ Setup & Usage

### Local Development

```bash
# Clone the repository
git clone https://github.com/Abhishek-Kumar07/Patient_Registration_App
cd patient-reg-app

# Install dependencies
npm install

# Start the app
npm run dev

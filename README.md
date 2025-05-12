Patient Registration App
## Overview
A simple web application for patient registration, built with React.js and Pglite (IndexedDB), providing persistent storage for patient data. It allows users to register new patients, view a list of registered patients, and delete patients.

## Features
Patient Registration: Form to register patients with fields like Name, Age, Gender, DOB, Contact, and Address.

View Registered Patients: Displays a table of all registered patients.

Delete Patient: Option to delete patients from the database.

## Technologies Used
React.js: Frontend framework.

Pglite: Library to store data in IndexedDB.

Vite: Build tool for fast development.


## Setup Instructions
Prerequisites
Ensure you have the following installed:

Node.js (v16.x or above)

NPM/Yarn




## Steps to Run the Project

1. Clone the repository:
   termnal: 
   git clone https://github.com/Abhishek-Kumar07/Patient_Registration_App

2. Navigate to the project directory:
   cd patient-reg-app

3. Install dependencies:
   npm install

4. Run the app:
   npm run dev

5. Open the app in your browser at http://localhost:5173.



## Structure
src/database/db.js: Initializes the database and defines SQL queries.

src/App.jsx: Main App component that renders the registration form and patient list.

src/components/PatientForm.jsx: Handles form submission, validation, and rendering the patient list.

vite.config.js: Configuration file for Vite.

Future Enhancements
Search functionality for patients.

Edit functionality for patient records.

More robust form validation (e.g., phone number format).




## Challenges Log

Handling IndexedDB with Pglite and understanding its limitations.

Ensuring the UI responsiveness across different screen sizes.

Optimizing data fetching and handling state properly in a React app.


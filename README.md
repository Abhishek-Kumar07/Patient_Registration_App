# Patient Registration App

This is a frontend-only patient registration app built with React.js and Pglite for persistent storage using IndexedDB. The app allows users to register patients, view the list of registered patients, and delete them as needed.

## Features

- **Patient Registration:** Users can enter details like name, age, gender, date of birth, contact, and address to register new patients.
- **Patient List Display:** Registered patients are displayed in a table with their details.
- **Delete Patient:** Users can delete a patient from the list by clicking the delete button next to their name.
- **Persistent Storage:** Data is stored locally using IndexedDB through Pglite, ensuring persistence even after a page refresh.

## Technologies Used

- **React.js:** For building the UI and handling user interactions.
- **Pglite:** A lightweight, frontend-only SQL database for data storage.
- **Vite:** A fast build tool for React projects.

## How to Run the Project

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


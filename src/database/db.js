// src/db.js
import { Pglite } from "pglite";

// Initialize Pglite with persistent storage (IndexedDB)
export const db = new Pglite("patient-reg-db");

// Ensure the patient table exists
export async function initDb() {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER,
      gender TEXT,
      dob TEXT,
      contact TEXT
    );
  `);
}

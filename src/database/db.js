// src/database/db.js
import { PGlite } from '@electric-sql/pglite';

// ✅ Use IndexedDB URI for browser support
export const db = new PGlite('idb://patient-reg-db');

export async function initDb() {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      gender TEXT NOT NULL,
      dob TEXT NOT NULL,
      contact TEXT NOT NULL,
      address TEXT NOT NULL
    );
  `);
}

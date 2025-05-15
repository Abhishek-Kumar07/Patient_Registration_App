// src/database/db.js
import { PGlite } from '@electric-sql/pglite';

export const db = new PGlite('idb://patient-reg-db');

export async function initDb() {
  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        age INTEGER NOT NULL,
        gender TEXT NOT NULL,
        dob TEXT NOT NULL,
        contact TEXT NOT NULL,
        address TEXT NOT NULL
      );
    `);


    console.log('Database initialized and table created!');
  } catch (e) {
    console.error('Error initializing database:', e);
  }
}



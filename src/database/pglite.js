import Pglite from 'pglite';

// Initialize the database
const db = new Pglite('patientDB', 1);

// Create a table for storing patient data
db.version(1).stores({
  patients: '&id, name, age, gender, contact, address',  // Primary key `id` and other fields
});

export default db;

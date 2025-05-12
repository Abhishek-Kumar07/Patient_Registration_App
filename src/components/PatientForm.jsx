import { useState, useEffect } from 'react';
import { db } from '../database/db';

const PatientForm = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    dob: '',
    contact: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [patients, setPatients] = useState([]);

  // Fetch all patients
  const fetchPatients = async () => {
    try {
      const result = await db.query('SELECT * FROM patients');
      setPatients(result.rows);
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const validate = () => {
    if (!form.name.trim()) return 'Name is required.';
    if (!form.age || parseInt(form.age) <= 0) return 'Age must be greater than 0.';
    if (!form.gender.trim()) return 'Gender is required.';
    if (!form.dob.trim()) return 'Date of Birth is required.';
    if (!form.contact.trim()) return 'Contact number is required.';
    if (!form.address.trim()) return 'Address is required.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);

    try {
      await db.query(
        `INSERT INTO patients (name, age, gender, dob, contact, address) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [form.name, form.age, form.gender, form.dob, form.contact, form.address]
      );
      setMessage('✅ Patient registered successfully!');
      setForm({ name: '', age: '', gender: '', dob: '', contact: '', address: '' });
      fetchPatients();
    } catch (e) {
      console.error('Error inserting data:', e);
      setError('❌ Failed to register patient.');
    }
  };

  const deletePatient = async (id) => {
    try {
      await db.query('DELETE FROM patients WHERE id = $1', [id]);
      fetchPatients();
    } catch (e) {
      console.error('Error deleting patient:', e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="age" type="number" min="1" placeholder="Age" value={form.age} onChange={handleChange} required />
        <select name="gender" value={form.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input name="dob" type="date" value={form.dob} onChange={handleChange} required />
        <input name="contact" placeholder="Contact Number" value={form.contact} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <button type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
      </form>

      {/* Table to display registered patients */}
      <div style={{ marginTop: '2rem' }}>
        <h3>Registered Patients</h3>
        {patients.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f4f4f4' }}>
                <th style={cellStyle}>ID</th>
                <th style={cellStyle}>Name</th>
                <th style={cellStyle}>Age</th>
                <th style={cellStyle}>Gender</th>
                <th style={cellStyle}>DOB</th>
                <th style={cellStyle}>Contact</th>
                <th style={cellStyle}>Address</th>
                <th style={cellStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td style={cellStyle}>{patient.id}</td>
                  <td style={cellStyle}>{patient.name}</td>
                  <td style={cellStyle}>{patient.age}</td>
                  <td style={cellStyle}>{patient.gender}</td>
                  <td style={cellStyle}>{patient.dob}</td>
                  <td style={cellStyle}>{patient.contact}</td>
                  <td style={cellStyle}>{patient.address}</td>
                  <td style={cellStyle}>
                    <button
                      onClick={() => deletePatient(patient.id)}
                      style={{
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#c0392b'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#e74c3c'}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No patients registered yet.</p>
        )}
      </div>
    </div>
  );
};

// Reusable style for table cells
const cellStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'left'
};

export default PatientForm;

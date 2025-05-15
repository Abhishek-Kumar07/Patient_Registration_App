import { useState, useEffect } from 'react';
import { db } from '../database/db';


const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#333'
  },
  card: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  heading: {
    marginBottom: '1rem',
    fontSize: '1.4rem',
    fontWeight: '600',
    color: '#2c3e50'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  input: {
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem'
  },
  button: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '6px',
    fontSize: '0.85rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  error: {
    color: 'red',
    marginTop: '-0.5rem'
  },
  success: {
    color: 'green',
    marginTop: '-0.5rem'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem'
  },
  cellStyle: {
    padding: '8px',
    border: '1px solid #ccc',
    textAlign: 'left'
  }
};

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
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={styles.heading}>Register New Patient</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} style={styles.input} />
          <input name="age" type="number" min="1" placeholder="Age" value={form.age} onChange={handleChange} style={styles.input} />
          <select name="gender" value={form.gender} onChange={handleChange} style={styles.input}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input name="dob" type="date" value={form.dob} onChange={handleChange} style={styles.input} />
          <input name="contact" placeholder="Contact Number" value={form.contact} onChange={handleChange} style={styles.input} />
          <input name="address" placeholder="Address" value={form.address} onChange={handleChange} style={styles.input} />
          <button type="submit" style={styles.button}>Register</button>
          {error && <p style={styles.error}>{error}</p>}
          {message && <p style={styles.success}>{message}</p>}
        </form>
      </div>

      <div style={styles.card}>
        <h3 style={styles.heading}>Registered Patients</h3>
        {patients.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.cellStyle}>ID</th>
                <th style={styles.cellStyle}>Name</th>
                <th style={styles.cellStyle}>Age</th>
                <th style={styles.cellStyle}>Gender</th>
                <th style={styles.cellStyle}>DOB</th>
                <th style={styles.cellStyle}>Contact</th>
                <th style={styles.cellStyle}>Address</th>
                <th style={styles.cellStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td style={styles.cellStyle}>{patient.id}</td>
                  <td style={styles.cellStyle}>{patient.name}</td>
                  <td style={styles.cellStyle}>{patient.age}</td>
                  <td style={styles.cellStyle}>{patient.gender}</td>
                  <td style={styles.cellStyle}>{patient.dob}</td>
                  <td style={styles.cellStyle}>{patient.contact}</td>
                  <td style={styles.cellStyle}>{patient.address}</td>
                  <td style={styles.cellStyle}>
                    <button
                      onClick={() => deletePatient(patient.id)}
                      style={styles.deleteBtn}
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
}

export default PatientForm;


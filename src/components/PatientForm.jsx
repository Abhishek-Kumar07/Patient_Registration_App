// src/components/PatientForm.jsx
import { useState } from 'react';
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
      // Use .query instead of .run
      await db.query(
        `INSERT INTO patients (name, age, gender, dob, contact, address) VALUES (?, ?, ?, ?, ?, ?)`,
        [form.name, form.age, form.gender, form.dob, form.contact, form.address]
      );
      setMessage('✅ Patient registered successfully!');
      setForm({ name: '', age: '', gender: '', dob: '', contact: '', address: '' });
    } catch (e) {
      console.error('Error inserting data:', e);
      setError('❌ Failed to register patient.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="age" type="number" min="1" placeholder="Age" value={form.age} onChange={handleChange} required />
      <select name="gender" value={form.gender} onChange={handleChange} required >
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
  );
};

export default PatientForm;

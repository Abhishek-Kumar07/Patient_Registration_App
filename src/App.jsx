// src/App.jsx
import { useEffect } from 'react';
import { initDb } from './database/db';
import PatientForm from './components/PatientForm';

function App() {
  useEffect(() => {
    initDb();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Patient Registration</h2>
      <PatientForm />
    </div>
  );
}

export default App;


// import { useEffect, useState } from 'react';
// import { initDb } from './database/db';
// import PatientForm from './components/PatientForm';

// import { useEffect } from 'react';
// import { initDb } from './db';

// function App() {
//   useEffect(() => {
//     const setup = async () => {
//       await initDb();
//     };
//     setup();
//   }, []);

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>Patient Registration</h2>
//       <PatientForm />
//     </div>
//   );
// }

// export default App;

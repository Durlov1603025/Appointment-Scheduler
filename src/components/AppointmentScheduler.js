import React, { useState } from 'react';
import { firestore } from '../firebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import './AppointmentScheduler.css';

const AppointmentScheduler = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);

  const handleSchedule = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      console.log("Attempting to add appointment:", { title, date });
      const docRef = await addDoc(collection(firestore, "appointments"), {
        title,
        date,
      });
      console.log("Document written with ID: ", docRef.id);
      alert('Appointment scheduled successfully');
      setTitle('');
      setDate('');
    } catch (error) {
      console.error("Error adding appointment:", error);
      setError(error.message);
    }
  };

  return (
    <div className="scheduler">
      <h2>Schedule an Appointment</h2>
      <form onSubmit={handleSchedule}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Schedule</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AppointmentScheduler;

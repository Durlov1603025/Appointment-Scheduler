import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { firestore } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'appointments'));
      const eventsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          title: data.title,
          start: new Date(data.date),
          end: new Date(data.date), // Assuming appointments are for a single day
          allDay: true
        };
      });
      setEvents(eventsData);
    };

    fetchAppointments();
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 520 }}
      />
    </div>
  );
};

export default CalendarView;

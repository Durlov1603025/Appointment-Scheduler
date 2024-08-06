import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { firestore } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import './CalendarView.css';

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

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

  const filteredEvents = events.filter(event => {
    const matchesSearchTerm = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const isUpcoming = new Date(event.start) >= new Date();
    const isPast = new Date(event.start) < new Date();

    if (filter === 'upcoming') {
      return matchesSearchTerm && isUpcoming;
    } else if (filter === 'past') {
      return matchesSearchTerm && isPast;
    } else {
      return matchesSearchTerm;
    }
  });

  return (
    <div style={{ height: '100vh' }}>
      <div className="controls">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>
      </div>
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default CalendarView;

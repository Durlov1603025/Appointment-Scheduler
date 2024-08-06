import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AppointmentScheduler from './components/AppointmentScheduler';
import CalendarView from './components/CalendarView';
import UserList from './components/UserList';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="container">
        <nav>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
          <a href="/scheduler">Scheduler</a>
          <a href="/appointments">Appointments</a>
          <a href='/users'>UserLists</a>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/scheduler" element={<AppointmentScheduler />} />
          <Route path="/appointments" element={<CalendarView />} />
          <Route path='/users' element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

/* todo:
- incorporate pullevents.js into code, remove all setevents calls etc
- create database update using same hook import method as pullevents
- incorporate db update method and call pullevents after calling that - doing that should finish allowing everything to be stored in db?
- MAKE SURE TO FINISH BOTH TEACHER AND ADMIN UPDATES - teacher only needs to be on reload
- ask carl for what else to add
- make some map or diagram of wtv tf i was cooking
- ****learn react****
- NEED TO RENAME pullEvents.js LOOK AT ERROR MESSAGE
- check lines 22, 55, 90-97
*/
import React, { useState } from 'react';
import './App.css';
import { createClient } from "@supabase/supabase-js";
import useEvents from "./useEvents";

// app component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [events] = useEvents(); // sets events list = data pulled from db through pullevents -> need to figure out what setEvents does
  /*
  const [events, setEvents] = useState([
    { name: "Math Competition", date: "2025-02-05", time: "10:00 AM", location: "Room 101" },
    { name: "Science Fair", date: "2025-02-06", time: "11:00 AM", location: "Room 202" },
    { name: "History Quiz", date: "2025-02-07", time: "1:00 PM", location: "Room 303" },
    { name: "Coding Workshop", date: "2025-02-08", time: "9:00 AM", location: "Room 404" },
    { name: "Art Exhibition", date: "2025-02-09", time: "2:00 PM", location: "Room 505" },
    { name: "Math Olympiad", date: "2025-02-10", time: "10:00 AM", location: "Room 106" },
    { name: "Literature Reading", date: "2025-02-11", time: "12:00 PM", location: "Room 207" },
    { name: "Music Concert", date: "2025-02-12", time: "7:00 PM", location: "Room 308" },
    { name: "Drama Play", date: "2025-02-13", time: "3:00 PM", location: "Room 409" },
    { name: "Sports Day", date: "2025-02-14", time: "9:00 AM", location: "Main Stadium" }
  ]);
  */

  const handleButtonClick = (type) => {
    setUserType(type);
  };

  const handleLogin = (username, password) => {
    setUsername(username);
    setPassword(password);
    setIsLoggedIn(true);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    setUserType('');
  };


  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]); // seems to update events list w/ const newevents -> assembled on add event button press, dont need to change this, need to change lines 90-97
  };


  return (
    <div>
      {!isLoggedIn ? (
        <div>
          <button onClick={() => handleButtonClick('Admin')}>Admin Login</button>
          <button onClick={() => handleButtonClick('Teacher')}>Teacher Login</button>

          {userType && (
            <LoginForm userType={userType} onLogin={handleLogin} />
          )}
        </div>
      ) : (
        <div>
          {userType === 'Admin' ? (
            <AdminDashboard events={events} onLogoutClick={handleLogoutClick} onAddEvent={handleAddEvent} />
          ) : (
            <TeacherDashboard events={events} onLogoutClick={handleLogoutClick} />
          )}
        </div>
      )}
    </div>
  );
};

// admin dashboard
const AdminDashboard = ({ events, onLogoutClick, onAddEvent }) => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  const handleAddEvent = () => {
    if (eventName && eventDate && eventTime && eventLocation) {
      const newEvent = { name: eventName, date: eventDate, time: eventTime, location: eventLocation };
      onAddEvent(newEvent);
      setEventName('');
      setEventDate('');
      setEventTime('');
      setEventLocation('');
    }
  };

  return (
    <div>
      <h2>Welcome to Admin Dashboard</h2>
      <button onClick={onLogoutClick}>Logout</button>

      <h3>Upcoming Events</h3>
      <div className="events-container">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <h4>{event.name}</h4>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>
          </div>
        ))}
      </div>

      <h3>Add New Event</h3>
      <div>
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Event Date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Event Time"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Event Location"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
        />
        <button onClick={handleAddEvent}>Add Event</button>
      </div>
    </div>
  );
};

// teacher dashboard (displays events)
const TeacherDashboard = ({ events, onLogoutClick }) => {
  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <h3>Upcoming Events</h3>
      <div className="events-container">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <h4>{event.name}</h4>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>
          </div>
        ))}
      </div>
      <button onClick={onLogoutClick}>Logout</button>
    </div>
  );
};

// login form
const LoginForm = ({ userType, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin(username, password);
  };

  return (
    <div>
      <h2>{userType} Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      <div>
        <label>Debug - Username: {username}, Password: {password}</label>
      </div>
    </div>
  );
};

const supabase = createClient("https://psotsoljdspoqjttyrxr.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzb3Rzb2xqZHNwb3FqdHR5cnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwNjk5NDQsImV4cCI6MjA0OTY0NTk0NH0.o1H5SXD0a-4RiBMcTyelbBmVuj6PqdIB5NWW1wSMImg");



export default App;



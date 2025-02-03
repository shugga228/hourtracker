import React, { useState } from 'react';
import './App.css';

// admin dashboard
const AdminDashboard = ({ events, onHomeClick, onAddEvent }) => {
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
      <button onClick={onHomeClick}>Home</button>

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
const TeacherDashboard = ({ events, onHomeClick }) => {
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
      <button onClick={onHomeClick}>Home</button>
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

// app component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  const handleButtonClick = (type) => {
    setUserType(type);
  };

  const handleLogin = (username, password) => {
    setUsername(username);
    setPassword(password);
    setIsLoggedIn(true);
  };

  const handleHomeClick = () => {
    setIsLoggedIn(false);
    setUserType('');
  };

  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
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
            <AdminDashboard events={events} onHomeClick={handleHomeClick} onAddEvent={handleAddEvent} />
          ) : (
            <TeacherDashboard events={events} onHomeClick={handleHomeClick} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;

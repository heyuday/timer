// src/components/ClassForm.js
import React, { useState } from 'react';

const ClassForm = ({ addClass }) => {
  const [className, setClassName] = useState('');
  const [days, setDays] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addClass({ className, days, startTime, endTime });
    setClassName('');
    setDays([]);
    setStartTime('');
    setEndTime('');
  };

  const handleDaysChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setDays(selectedOptions);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="class-name">Class Name:</label>
      <input
        type="text"
        id="class-name"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        required
      />
      <label htmlFor="days">Select Days:</label>
      <select
        id="days"
        name="days"
        multiple
        value={days}
        onChange={handleDaysChange}
        required
      >
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </select>
      <label htmlFor="start-time">Start Time:</label>
      <input
        type="time"
        id="start-time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
      />
      <label htmlFor="end-time">End Time:</label>
      <input
        type="time"
        id="end-time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
      />
      <button type="submit">Add Class</button>
    </form>
  );
};

export default ClassForm;

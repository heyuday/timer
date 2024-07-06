// src/components/ClassForm.js
import React, { useState } from 'react';

const ClassForm = ({ addClass }) => {
  const [className, setClassName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addClass({ className, startTime: new Date(startTime), endTime: new Date(endTime) });
    setClassName('');
    setStartTime('');
    setEndTime('');
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
      <label htmlFor="start-time">Start Time:</label>
      <input
        type="datetime-local"
        id="start-time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
      />
      <label htmlFor="end-time">End Time:</label>
      <input
        type="datetime-local"
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

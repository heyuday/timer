// src/components/ClassList.js
import React from 'react';



const ClassList = ({ classes }) => (
  <div>
    <ul>
      {classes.map((classItem, index) => (
        <li key={index}>
          {classItem.className} - {classItem.days.join(', ')} from {formatTime(classItem.startTime)} to {formatTime(classItem.endTime)}
        </li>
      ))}
    </ul>
  </div>
);

export default ClassList;

const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(hours, minutes);

  const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  return date.toLocaleString('en-US', options);
};
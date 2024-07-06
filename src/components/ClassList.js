// src/components/ClassList.js
import React from 'react';

const ClassList = ({ classes }) => (
  <div>
    <h2>Class Schedule</h2>
    <ul>
      {classes.map((classItem, index) => (
        <li key={index}>
          {classItem.className} - {classItem.startTime.toLocaleString()} to {classItem.endTime.toLocaleString()}
        </li>
      ))}
    </ul>
  </div>
);

export default ClassList;

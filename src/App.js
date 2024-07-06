// src/App.js
import React, { useState, useEffect } from 'react';
import ClassForm from './components/ClassForm';
import Timer from './components/Timer';
import ClassList from './components/ClassList';
import './components/stylesTimer.css';

const App = () => {
  const [classes, setClasses] = useState([]);

  const addClass = (classItem) => {
    setClasses([...classes, classItem]);
  };

  const nextClass = classes.find(
    (classItem) => new Date(classItem.startTime) > new Date()
  );

  return (
    <div className="container">
      <header>
        <h1>University Class Timer</h1>
      </header>
      <div className="timer-container">
        <Timer nextClass={nextClass} />
      </div>
      <div className="timer-content">
        <main className="main-content">
          <div className="section">
            <h2 className="section-title">Class Schedule</h2>
            <ClassList classes={classes} />
          </div>
          <div className="section">
            <h2 className="section-title">Add a Class</h2>
            <ClassForm addClass={addClass} />
          </div>
        </main>
      </div>
      <footer>
        <p>&copy; 2024 University Class Timer</p>
      </footer>
    </div>
  );
};

export default App;

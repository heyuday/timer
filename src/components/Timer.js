// src/components/Timer.js
import React, { useEffect, useState } from 'react';
import './Timer.css'; // Assuming you have a CSS file for timer styles

const Timer = ({ nextClass }) => {
  const calculateTimeLeft = () => {
    if (!nextClass || !nextClass.startTime) {
      return 'No upcoming classes'; // Handle the case where nextClass is not set
    }

    const now = new Date();
    const timeLeft = nextClass.startTime - now;

    if (timeLeft <= 0) {
      return 'Class is in progress';
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return `${days > 0 ? days + ' days ' : ''}${hours}:${minutes}:${seconds}`;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [nextClass]);

  if (!nextClass) {
    return null; // Or render a message or loading indicator if nextClass is not defined
  }

  return (
    <div className="timer-container">
      <div className="timer-circle">
        <p className="timer-text">{timeLeft}</p>
      </div>
    </div>
  );
};

export default Timer;

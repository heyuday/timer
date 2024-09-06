/*// src/components/Timer.js
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

export default Timer;*/
// src/components/Timer.js
import React, { useEffect, useState } from 'react';

const Timer = ({ classes }) => {
  const [timeUntilNextClass, setTimeUntilNextClass] = useState(null);
  const [timeDuringClass, setTimeDuringClass] = useState(null);

  useEffect(() => {
    if (classes && classes.length > 0) {
      let nextClassInterval = null;
      let classInterval = null;

      const calculateTimeUntilNextClass = () => {
        const now = new Date();
        const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
        const currentTime = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

        let closestClassTime = Infinity;

        classes.forEach((classItem) => {
          if (classItem.days.includes(currentDay)) {
            const [startHour, startMinute] = classItem.startTime.split(':');
            const startSeconds = parseInt(startHour, 10) * 3600 + parseInt(startMinute, 10) * 60;

            if (currentTime < startSeconds && startSeconds < closestClassTime) {
              closestClassTime = startSeconds;
            }
          }
        });

        if (closestClassTime !== Infinity) {
          const timeUntilNext = closestClassTime - currentTime;
          setTimeUntilNextClass(timeUntilNext > 0 ? timeUntilNext : null);
        } else {
          setTimeUntilNextClass(null);
        }
      };

      const calculateTimeDuringClass = () => {
        const now = new Date();
        const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
        const currentTime = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

        classes.forEach((classItem) => {
          if (classItem.days.includes(currentDay)) {
            const [startHour, startMinute] = classItem.startTime.split(':');
            const [endHour, endMinute] = classItem.endTime.split(':');
            const startSeconds = parseInt(startHour, 10) * 3600 + parseInt(startMinute, 10) * 60;
            const endSeconds = parseInt(endHour, 10) * 3600 + parseInt(endMinute, 10) * 60;

            if (currentTime >= startSeconds && currentTime < endSeconds) {
              const timeDuring = endSeconds - currentTime;
              setTimeDuringClass(timeDuring > 0 ? timeDuring : null);
            }
          }
        });

        if (!timeDuringClass) {
          setTimeDuringClass(null);
        }
      };

      calculateTimeUntilNextClass();
      nextClassInterval = setInterval(calculateTimeUntilNextClass, 1000);

      calculateTimeDuringClass();
      classInterval = setInterval(calculateTimeDuringClass, 1000);

      return () => {
        clearInterval(nextClassInterval);
        clearInterval(classInterval);
      };
    } else {
      // Handle case where classes are not defined or empty
      setTimeUntilNextClass(null);
      setTimeDuringClass(null);
    }
  }, [classes, timeDuringClass]);

  const formatTime = (seconds) => {
    if (seconds === null) return '';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h2>Countdown Timers</h2>
      {timeUntilNextClass !== null && (
        <div>
          <h3>Time Until Next Class:</h3>
          <p>{formatTime(timeUntilNextClass)}</p>
        </div>
      )}
      {timeDuringClass !== null && (
        <div>
          <h3>Time During Class:</h3>
          <p>{formatTime(timeDuringClass)}</p>
        </div>
      )}
    </div>
  );
};

export default Timer;

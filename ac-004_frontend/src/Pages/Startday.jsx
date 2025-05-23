// Startday.jsx
import React, { useState, useEffect } from 'react';
import './Startday.css';
import axios from "axios";

const Startday = ({ userID }) => {

  const [activeTab, setActiveTab] = useState('Focus Time');
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  //zemas tasks i mestis tasks, currindex e za momentalnio task da se koristi
  const [tasks, setTasks] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);

  const currentTask = tasks[currIndex];
  const nextTask = tasks[currIndex + 1];

  // site uslovi za da gi zema se vo taskmodel/controller , pooptimizirano e vo logika na ako se 1000 tasks tamu neka napraj filter ne ovde
  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await axios.get(`http://localhost:3000/tasks/short-term/${userID}`);
        if (res.data.success) {
          setTasks(res.data.tasks);
          setCurrIndex(0);
        }
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    }

    if (userID) {
      fetchTasks();
    }
  }, [userID]);

  // logiki 2-3 se za da zemi prefrli i syncni duration
    useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      onNextTask();
    }
  }, [timeLeft, isRunning]);

  useEffect(() => {
    if (tasks[currIndex]) {
      setTimeLeft(tasks[currIndex].duration);
      setActiveTab('Task Duration');
      setIsRunning(false);
    }
  }, [currIndex, tasks]);

  //prefrlanje na index za sleden task da se namesti 
  function onNextTask() {
    setTasks(prevTasks => {
      const updatedTasks = [...prevTasks];
      if (updatedTasks[currIndex]) {
        updatedTasks[currIndex].is_finished = true;  // Mark current as finished
      }
      return updatedTasks;
    });

    if (currIndex + 1 < tasks.length) {
      setCurrIndex(currIndex + 1);  // Move to next task
    } else {
      alert("You finished all your tasks!");
    }
  }

  //smeniv malce kod i simplificirav za da trgni odavde taskduration a ne kako api pulling
  const taskDuration = currentTask && currentTask.duration
    ? currentTask.duration * 60  // convert minutes to seconds
    : null;  // or undefined if no duration available

  //ako nema task chmaj na 25min
  const timerPresets = {
    'Focus Time': taskDuration || 1500,
    'Short Break': 300,
    'Long Break': 900
  };

  //nebitni sranja za tajmero
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setTimeLeft(timerPresets[tab]);
    setIsRunning(false);
    setIsEditing(false);
  };

  const handleSaveTime = () => {
    const totalSeconds = (minutes * 60) + seconds;
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds);
    }
    setIsEditing(false);
    setIsRunning(false);
  };

  return (
    <div className="dynamic-container">

      <div className="startday-current-task">
        <h2 className="task-text"> Current task </h2>

        <div className="startday-tasks">
          {currentTask ? (
            <h3>{currentTask.title}</h3>
          ) : (
            <p>No tasks available</p>
          )}
        </div>
      </div>

      <div className="startday-container">
        <div className="startday-tabs">
          {Object.keys(timerPresets).map((tab) => (
            <button
              key={tab}
              className={`startday-tab-button ${activeTab !== tab ? 'inactive' : ''}`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="startday-timer-display">
          {formatTime(timeLeft)}
        </div>

        <div className="startday-button-container">
          <button
            className="startday-main-button"
            style={{ backgroundColor: '#e74c3c', color: 'white' }}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? 'PAUSE' : 'START'}
          </button>

          {!isEditing ? (
            <button
              className="startday-main-button"
              style={{ backgroundColor: '#666', color: 'white' }}
              onClick={() => {
                const mins = Math.floor(timeLeft / 60);
                const secs = timeLeft % 60;
                setMinutes(mins);
                setSeconds(secs);
                setIsEditing(true);
              }}
            >
              CHANGE TIME
            </button>
          ) : (
            <div className="startday-edit-container">
              <div className="startday-input-group">
                <div className="startday-time-input-container">
                  <span className="startday-input-label">Minutes</span>
                  <input
                    type="number"
                    className="startday-time-input"
                    value={minutes}
                    onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                    min="0"
                  />
                </div>
                <div className="startday-time-input-container">
                  <span className="startday-input-label">Seconds</span>
                  <input
                    type="number"
                    className="startday-time-input"
                    value={seconds}
                    onChange={(e) => {
                      let value = parseInt(e.target.value) || 0;
                      value = Math.min(59, Math.max(0, value));
                      setSeconds(value);
                    }}
                    min="0"
                    max="59"
                  />
                </div>
              </div>

              <div className="startday-action-buttons">
                <button
                  className="startday-main-button"
                  style={{ backgroundColor: '#4CAF50', flex: 1, maxWidth: '120px' }}
                  onClick={handleSaveTime}
                >
                  SAVE
                </button>
                <button
                  className="startday-main-button"
                  style={{ backgroundColor: '#666', flex: 1, maxWidth: '120px' }}
                  onClick={() => setIsEditing(false)}
                >
                  CANCEL
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="startday-current-task">

        <div className="task-text">
          Next Task
        </div>

        <div className="startday-tasks">
          {nextTask ? nextTask.title : "No more tasks"}
        </div>

      </div>

    </div>
  );
};

export default Startday;
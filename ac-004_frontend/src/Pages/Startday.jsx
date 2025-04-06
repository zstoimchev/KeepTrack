// Startday.jsx
import React, { useState, useEffect } from 'react';
import './Startday.css';
import axios from "axios";

const Startday = () => {
  const [activeTab, setActiveTab] = useState('Focus Time');
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  const [tasks, setTasks] = useState([]);
  const [firstTask, setFirstTask] = useState(null);
  const [taskDuration, setTaskDuration] = useState(null);

  const fetchOneTask = async() => {
    const user_id = localStorage.getItem("id");
    const response = await axios.post("http://localhost:3000/tasks/get-shortterm", {
      user_id }
    );
    setFirstTask(response.data.tasks[6] || null);
  };

  useEffect(() => { fetchOneTask(); }, []);
  
  useEffect(() => {
    const fetchTaskDuration = async () => {
      try {
        const user_id = localStorage.getItem("id");
        const response = await axios.post("http://localhost:3000/tasks/get-shortterm", {
          user_id }
        );
        const taskMinutes = response.data.tasks[6]?.duration || 25;
        setTimeLeft(taskMinutes * 60);
      } catch (err) {
        console.log("Using default timer (25min)");
      }
    };
    fetchTaskDuration();
  }, []);

  useEffect(() => {
    if (taskDuration) {
      setTimeLeft(taskDuration);
      setActiveTab('Task Duration');
    }
  }, [taskDuration]);

  /* const fetchShortTermTasks = async () => {
    try {
      const user_id = localStorage.getItem("id");
      const response = await axios.post("http://localhost:3000/tasks/get-shortterm", { 
        user_id 
      });
      setTasks(response.data.tasks);
    } catch (err) {
      console.log("No short-term tasks found");
    }
  };
  
  useEffect(() => {
    fetchShortTermTasks();
  }, []); */

  useEffect(() => {
    if (tasks.some(task => task.date === "longterm")) {
      console.error("Long-term task leaked!"); // vo slucaj da ebi db nes
    }
  }, [tasks]);

  const timerPresets = {
    'Focus Time': taskDuration || 1500,
    'Short Break': 300,
    'Long Break': 900
  };

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
    setTimeLeft(timerPresets[tab]); // Automatically uses taskDuration if tab is 'Task Duration'
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
          {firstTask ? (
            <h3>{firstTask.title}</h3>
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
          Task From Plan Your Day Here
        </div>

      </div>

    </div>
  );
};

export default Startday;
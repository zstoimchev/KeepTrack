import React, { useState, useEffect } from 'react';
import './Startday.css';
import axios from "axios";

const Startday = ({ userID }) => {

    const [activeTab, setActiveTab] = useState('Focus Time');
    const [timeLeft, setTimeLeft] = useState(1500);
    const [isRunning, setIsRunning] = useState(false);

    const [tasks, setTasks] = useState([]);
    const [currIndex, setCurrIndex] = useState(0);

    const currentTask = tasks.find((task, index) => index === currIndex && !task.is_finished);

    const [allTasksFinished, setAllTasksFinished] = useState(false);

    const [savedFocusTimeLeft, setSavedFocusTimeLeft] = useState(null);

    // Fetch tasks for the day
    useEffect(() => {
        async function fetchTasks() {
            try {
                const date = new Date();
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const year = date.getFullYear();
                const today = `${year}-${month}-${day}`;
                const res = await axios.post('http://localhost:3000/tasks/get-date', {
                    user_id: userID, date: today
                });

                if (res.data.success) {
                    const allTasks = res.data.tasks;
                    const firstUnfinishedIndex = allTasks.findIndex(task => !task.is_finished);
                    setTasks(allTasks);
                    setCurrIndex(firstUnfinishedIndex !== -1 ? firstUnfinishedIndex : null);
                    if (firstUnfinishedIndex !== -1) {
                        setTimeLeft(allTasks[firstUnfinishedIndex].duration * 60);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch tasks", error);
            }
        }

        if (userID) {
            fetchTasks();
        }
    }, [userID]);

    // Timer presets for Breaks and Focus Time
    const timerPresets = {
        'Focus Time': currentTask ? currentTask.duration * 60 : null,
        'Short Break': 300,
        'Long Break': 900
    };

    // Timer logic
    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 0) {
                        clearInterval(interval);
                        setIsRunning(false);
                        if (activeTab === 'Focus Time') {
                            markTaskAsFinished().then(() => setNextTask());
                        } else if (activeTab === 'Short Break') {
                            setTimeLeft(timerPresets["Short Break"]);
                        } else if (activeTab === 'Long Break') {
                            setTimeLeft(timerPresets["Long Break"]);
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    // Mark current task as finished via API
    const markTaskAsFinished = async () => {
        const current = tasks[currIndex];
        if (current) {
            try {
                const updatedTasks = tasks.map((task, index) => index === currIndex ? {
                    ...task, is_finished: true
                } : task);
                setTasks(updatedTasks);

                await axios.put(`http://localhost:3000/tasks/update-completion/${current.id}`);

                const hasUnfinishedTasks = updatedTasks.some(task => !task.is_finished);
                setAllTasksFinished(!hasUnfinishedTasks);

            } catch (error) {
                console.error("Failed to mark task as finished:", error);
                setTasks(tasks);
            }
        }
    };

    const setNextTask = () => {
        const nextUnfinishedIndex = tasks.findIndex((task, index) => index > currIndex && !task.is_finished);

        if (nextUnfinishedIndex !== -1) {
            setCurrIndex(nextUnfinishedIndex);
            setTimeLeft(tasks[nextUnfinishedIndex].duration * 60);
        } else {
            setCurrIndex(null);
            setTimeLeft(null);
            setActiveTab('Focus Time');
            setIsRunning(false);
        }
    };


    // Format time for display (MM:SS)
    const formatTime = (totalSeconds) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'Focus Time') {
        if (savedFocusTimeLeft !== null) {
            setTimeLeft(savedFocusTimeLeft);  // Resume from where paused
        } else if (currentTask) {
            setTimeLeft(currentTask.duration * 60);  // New task start
        } else {
            setTimeLeft(null);
        }
    } else {
        setTimeLeft(timerPresets[tab]);  // Short or Long Break
    }
    setIsRunning(false);
};

    return (<div className="dynamic-container">
        {/* Current Task Section */}
        <div className="startday-current-task">
            <h2 className="task-text">Current task:</h2>
            <div className="startday-tasks">
                {currentTask ? (<h3>{currentTask.title}</h3>)
                    : (<p className="task-text-spot">No Tasks have been Added.</p>)}
            </div>
        </div>

        {/* Timer and Tab Controls */}
        <div className="startday-container">
            <div className="startday-tabs">
                {Object.keys(timerPresets).map((tab) => (<button
                    key={tab}
                    className={`startday-tab-button ${activeTab !== tab ? 'inactive' : ''}`}
                    onClick={() => handleTabChange(tab)}
                >
                    {tab}
                </button>))}
            </div>

            <div className="startday-timer-display">
                {timeLeft !== null ? formatTime(timeLeft) : "Finished for the day!"}
            </div>

            <div className="startday-button-container">
                {activeTab === 'Focus Time' && allTasksFinished ? null : (<button
                    className="startday-main-button"
                    style={{ backgroundColor: '#e74c3c', color: 'white' }}
                    onClick={() => {
                        if (isRunning) {
                            // Pause pressed, save timeLeft
                            if (activeTab === 'Focus Time') {
                                setSavedFocusTimeLeft(timeLeft);
                            }
                        }
                        setIsRunning(!isRunning);
                    }}
                    disabled={timeLeft === null}
                >
                    {isRunning ? 'PAUSE' : 'START'}
                </button>)}

            </div>
        </div>

        {/* Next Task Section */}
        <div className="startday-current-task">
            <div className="task-text">
                Next Task:
            </div>

            <div className="startday-tasks">
                {tasks.find((task, index) => index > currIndex && !task.is_finished) ?
                    <h3>{tasks.find((task, index) => index > currIndex && !task.is_finished).title}</h3> :
                    <p className="task-text-spot">Plan your Tasks to see them Here.</p>}
            </div>
        </div>
    </div>);
};

export default Startday;

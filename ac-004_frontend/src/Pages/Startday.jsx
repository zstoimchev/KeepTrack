import React, {useState, useEffect} from 'react';
import './Startday.css';
import axios from "axios";

const Startday = ({userID}) => {

    const [activeTab, setActiveTab] = useState('Focus Time');
    const [timeLeft, setTimeLeft] = useState(1500); // Default: 25 minutes (Focus Time)
    const [isRunning, setIsRunning] = useState(false);

    const [tasks, setTasks] = useState([]);
    const [currIndex, setCurrIndex] = useState(0);

    const currentTask = tasks.find((task, index) => index === currIndex && !task.is_finished);

    const [allTasksFinished, setAllTasksFinished] = useState(false);

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
                        setTimeLeft(allTasks[firstUnfinishedIndex].duration * 60); // duration in seconds
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
        'Focus Time': currentTask ? currentTask.duration * 60 : null, // Use task duration or null if no task
        'Short Break': 300, // 5 minutes
        'Long Break': 900  // 15 minutes
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
                // Optimistic local update
                const updatedTasks = tasks.map((task, index) =>
                    index === currIndex ? {...task, is_finished: true} : task
                );
                setTasks(updatedTasks);

                await axios.put(`http://localhost:3000/tasks/update-completion/${current.id}`);

                // Check if all tasks are now finished
                const hasUnfinishedTasks = updatedTasks.some(task => !task.is_finished);
                setAllTasksFinished(!hasUnfinishedTasks);

            } catch (error) {
                // Revert on error
                console.error("Failed to mark task as finished:", error);
                setTasks(tasks);
            }
        }
    };

    // Set the next task as the current task
    const setNextTask = () => {
        // Find the next unfinished task
        const nextUnfinishedIndex = tasks.findIndex((task, index) =>
            index > currIndex && !task.is_finished
        );

        if (nextUnfinishedIndex !== -1) {
            setCurrIndex(nextUnfinishedIndex);
            setTimeLeft(tasks[nextUnfinishedIndex].duration * 60);
        } else {
            // No more unfinished tasks - reset everything
            setCurrIndex(null);
            setTimeLeft(null);
            setActiveTab('Focus Time'); // Reset to Focus Time tab
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
        if (tab === 'Focus Time' && !currentTask) {
            setTimeLeft(null);  // Disable the timer when there's no current task in Focus Time mode
        } else {
            setTimeLeft(timerPresets[tab]);
        }
        setIsRunning(false);
    };

    return (<div className="dynamic-container">
        {/* Current Task Section */}
        <div className="startday-current-task">
            <h2 className="task-text">Current task</h2>
            <div className="startday-tasks">
                {currentTask ? (<h3>{currentTask.title}</h3>) : (<p>No tasks available</p>)}
            </div>
        </div>

        {/* Timer and Tab Controls */}
        <div className="startday-container">
            <div className="startday-tabs">
                {Object.keys(timerPresets).map((tab) => (<button
                    key={tab}
                    className={`startday-tab-button ${activeTab !== tab ? 'inactive' : ''}`}
                    onClick={() => handleTabChange(tab)}
                    // disabled={tab === 'Focus Time' && !currentTask} // Disable Focus Time tab when there's no current task
                >
                    {tab}
                </button>))}
            </div>

            <div className="startday-timer-display">
                {timeLeft !== null ? formatTime(timeLeft) : "Finished for the day!"}
            </div>

            <div className="startday-button-container">
                <button
                    className="startday-main-button"
                    style={{backgroundColor: '#e74c3c', color: 'white'}}
                    onClick={() => setIsRunning(!isRunning)}
                    disabled={timeLeft === null} // Disable the button when there's no timer to start
                >
                    {isRunning ? 'PAUSE' : 'START'}
                </button>
            </div>
        </div>

        {/* Next Task Section */}
        <div className="startday-current-task">
            <div className="task-text">
                Next Task
            </div>

            <div className="startday-tasks">
                {tasks.find((task, index) => index > currIndex && !task.is_finished)
                    ? <h3>{tasks.find((task, index) => index > currIndex && !task.is_finished).title}</h3>
                    : <p className="no-tasks-message">No more tasks</p>
                }
            </div>
        </div>
    </div>);
};

export default Startday;

import React, {useEffect, useState} from "react";
import "./Sidebar.css";
import {useNavigate} from "react-router-dom";

const Sidebar = ({onLogout}) => {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedTaskName, setEditedTaskName] = useState("");
    const [editedTaskDuration, setEditedTaskDuration] = useState("");

    const [currentDate, setCurrentDate] = useState({day: "", month: "", year: ""});

    useEffect(() => {
        const date = new Date();
        const day = date.getDate().toString(); // Gets day without comma
        const month = date.toLocaleString('en-US', { month: 'long' }).toUpperCase();
        const year = date.getFullYear().toString();

        setCurrentDate({ day, month, year });
    }, []);

    const handleLogout = () => {
        onLogout();
        navigate("/login");
    };

    const addTask = () => {
        if (tasks.length < 10) {
            const newTask = {name: "", duration: ""}; // Initialize with `name` and `duration` properties
            setTasks([...tasks, newTask]);
            setEditingIndex(tasks.length); // Set the new task to editing mode
            setEditedTaskName(""); // Clear the input for editing name
            setEditedTaskDuration(""); // Clear the input for editing duration
        }
    };

    const removeTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const startEditing = (index) => {
        setEditingIndex(index);
        setEditedTaskName(tasks[index].name); // Set the name for editing
        setEditedTaskDuration(tasks[index].duration); // Set the duration for editing
    };

    const saveTask = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index
                ? {...task, name: editedTaskName, duration: editedTaskDuration}
                : task
        );
        setTasks(updatedTasks);
        setEditingIndex(null);
        setEditedTaskName(""); // Reset the edited name
        setEditedTaskDuration(""); // Reset the edited duration
    };

    const cancelTask = (index) => {
        if (!tasks[index].name && !tasks[index].duration) {
            // Check if both name and duration are empty
            const updatedTasks = tasks.filter((_, i) => i !== index); // Remove the empty task
            setTasks(updatedTasks);
        }
        setEditingIndex(null); // Exit editing mode
        setEditedTaskName(""); // Reset the edited name
        setEditedTaskDuration(""); // Reset the edited duration
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = {
            ...updatedTasks[index],
            completed: !updatedTasks[index].completed
        };
        setTasks(updatedTasks);
    };

    return (
        <div className="sidebar">
            <div className="user-section">
                <div className="user-icon"></div>
                <p>{localStorage.getItem("name") || "User"}</p>
            </div>
            <div className="tasks-section">
                <p>Long-Term Tasks</p>
                <div className="task-container">
                    {tasks.map((task, i) => (
                        <div key={i} className="task">
                            {editingIndex === i ? (
                                <>
                                    <div className="input-container">
                                        <input
                                            type="text"
                                            value={editedTaskName}
                                            placeholder="Task Name"
                                            onChange={(e) => setEditedTaskName(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            value={editedTaskDuration}
                                            placeholder="Task Duration"
                                            onChange={(e) => setEditedTaskDuration(e.target.value)}
                                        />

                                    </div>
                                    <div className="edit-buttons">
                                        <button onClick={() => saveTask(i)} className="save-task">
                                            💾
                                        </button>
                                        <button onClick={() => cancelTask(i)} className="cancel-task">
                                            ❌
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <input
                                        type="checkbox"
                                        checked={task.completed || false}
                                        onChange={() => toggleTaskCompletion(i)}
                                        className="task-checkbox"
                                    />
                                    <button className="remove-task"
                                            onClick={() => removeTask(i)}>❌
                                    </button>
                                    <div className="task-details" style={{textAlign: 'left', flexGrow: 1}}>
                                        <div className="task-name">Task: {task.name}</div>
                                        <div className="task-duration">Due date: {task.duration}</div>
                                    </div>
                                    <button className="edit-task"
                                            onClick={() => startEditing(i)}>✏️
                                    </button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
                {tasks.length < 10 && (
                    <div className="button-section" onClick={addTask}>
                        <p>+ Add new</p>
                    </div>
                )}
            </div>

            <div className="date-section">
                <p className="date-day-xl">{currentDate.day}</p>
                <div className="date-month-year-group">
                    <p className="date-month-bold">{currentDate.month}</p>
                    <p className="date-year-subtle">{currentDate.year}</p>
                </div>
            </div>

            <div className="button-section">
                <p>SETTINGS</p>
                <p onClick={handleLogout}>LOG OUT</p>
            </div>
        </div>
    );
};

export default Sidebar;

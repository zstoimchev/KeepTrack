import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Add axios for API requests

const Sidebar = ({ onLogout }) => {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedTaskName, setEditedTaskName] = useState("");
    const [editedTaskDuration, setEditedTaskDuration] = useState("");

    const [currentDate, setCurrentDate] = useState({ day: "", month: "", year: "" });

    useEffect(() => {
        const date = new Date();
        const day = date.getDate().toString();
        const month = date.toLocaleString("en-US", { month: "long" }).toUpperCase();
        const year = date.getFullYear().toString();
        setCurrentDate({ day, month, year });
    }, []);

    const fetchTasks = async () => {
        const userId = localStorage.getItem("id");
        try {
            const response = await axios.get(`http://localhost:3000/tasks/long-term/all/${userId}`);

            if (response.data.tasks && response.data.tasks.length > 0) {
                setTasks(response.data.tasks); // Assign tasks if they exist
            } else {
                setTasks([]); // Set tasks to an empty array if no tasks are present
            }
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []); // Empty dependency array ensures this runs once on component mount

    const handleLogout = () => {
        onLogout();
        navigate("/login");
    };

    const addTask = () => {
        const newTask = { name: "", duration: "", date: "long-term" };
        setTasks([...tasks, newTask]);
        setEditingIndex(tasks.length);
        setEditedTaskName("");
        setEditedTaskDuration("");
    };

    const removeTask = async (index) => {
        const taskToDelete = tasks[index]; // Get the task to delete
        try {
            // Make API call to delete the task
            await axios.delete(`http://localhost:3000/tasks/delete/${taskToDelete.id}`);
            fetchTasks()
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const startEditing = (index) => {
        setEditingIndex(index);
        setEditedTaskName(tasks[index].title);
        setEditedTaskDuration(tasks[index].duration);
    };

    const saveTask = async (index) => {
        if (!editedTaskName || !editedTaskDuration) {
            alert("Please enter both name and duration for the task.");
            return;
        }

        const taskToSave = { ...tasks[index], name: editedTaskName, duration: editedTaskDuration };

        if (taskToSave.id) {
            // Existing task: Update it
            try {
                await axios.put(`http://localhost:3000/tasks/long-term/update/${taskToSave.id}`, {
                    title: editedTaskName,
                    user_id: localStorage.getItem("id"),
                    duration: editedTaskDuration,
                });
                fetchTasks();
            } catch (error) {
                console.error("Error updating task:", error);
            }
        } else {
            // New task: Add it to backend
            try {
                await axios.post("http://localhost:3000/tasks/add", {
                    title: editedTaskName,
                    user_id: localStorage.getItem("id"),
                    date: "long-term",
                    priority: "low",
                    duration: editedTaskDuration,
                });
                fetchTasks()
            } catch (error) {
                console.error("Error adding new task:", error);
            }
        }

        // Clear editing state
        setEditingIndex(null);
        setEditedTaskName("");
        setEditedTaskDuration("");
    };


    const cancelTask = (index) => {
        if (!tasks[index].name && !tasks[index].duration) {
            const updatedTasks = tasks.filter((_, i) => i !== index);
            setTasks(updatedTasks);
        }
        setEditingIndex(null);
        setEditedTaskName("");
        setEditedTaskDuration("");
    };

    const handleSettings = () => {
        navigate('/settings');
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = {
            ...updatedTasks[index], completed: !updatedTasks[index].completed,
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
                    {tasks.map((task, i) => (<div key={i} className="task">
                        {editingIndex === i ? (<>
                            <div className="input-container">
                                <input
                                    type="text"
                                    value={editedTaskName}
                                    placeholder="Task Name"
                                    onChange={(e) => setEditedTaskName(e.target.value)} />
                                <input
                                    type="text"
                                    value={editedTaskDuration}
                                    placeholder="Task Duration"
                                    onChange={(e) => setEditedTaskDuration(e.target.value)} />
                            </div>
                            <div className="edit-buttons">
                                <button onClick={() => saveTask(i)} className="save-task">
                                    💾
                                </button>
                                <button onClick={() => cancelTask(i)} className="cancel-task">
                                    ❌
                                </button>
                            </div>
                        </>) : (<>
                            <input
                                type="checkbox"
                                checked={task.completed || false}
                                onChange={() => toggleTaskCompletion(i)}
                                className="task-checkbox" />
                            <button
                                className="remove-task"
                                onClick={() => removeTask(i)}>
                                ❌
                            </button>
                            <div
                                className="task-details"
                                style={{ textAlign: "left", flexGrow: 1 }}>
                                <div className="task-name">Task: {task.title}</div>
                                <div className="task-duration">Due date: {task.duration}</div>
                            </div>
                            <button
                                className="edit-task"
                                onClick={() => startEditing(i)}>
                                ✏️
                            </button>
                        </>)}
                    </div>))}
                </div>
                <div className="button-section" onClick={addTask}>
                    <p>+ Add new</p>
                </div>
            </div>

            <div className="date-section">
                <p className="date-day-xl">{currentDate.day}</p>
                <div className="date-month-year-group">
                    <p className="date-month-bold">{currentDate.month}</p>
                    <p className="date-year-subtle">{currentDate.year}</p>
                </div>
            </div>

            <div className="button-section">
                <p className="button-section" onClick={handleSettings}>Settings</p>
                <p className="button-section" onClick={handleLogout}>Log Out</p>
            </div>
        </div>);
};

export default Sidebar;

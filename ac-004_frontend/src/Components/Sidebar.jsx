import React, {useEffect, useState} from "react";
import "./Sidebar.css";
import {useNavigate} from "react-router-dom";

const Sidebar = ({onLogout}) => {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedTaskName, setEditedTaskName] = useState("");

    const [currentDate, setCurrentDate] = useState({day: "", month: "", year: ""});

    useEffect(() => {
        const date = new Date();
        const options = {day: "2-digit", month: "long", year: "numeric"};
        const formattedDate = date.toLocaleDateString("en-US", options);
        const [month, day, year] = formattedDate.split(" ");
        setCurrentDate({day, month: month.toUpperCase(), year});
    }, []);

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    const addTask = () => {
        if (tasks.length < 10) {
            const newTask = {name: ""}; // Use an object with a name property
            setTasks([...tasks, newTask]);
            setEditingIndex(tasks.length); // Set the new task to editing mode
            setEditedTaskName(""); // Clear the input for editing
        }
    };

    const removeTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const startEditing = (index) => {
        setEditingIndex(index);
        setEditedTaskName(tasks[index].name); // Set the name for editing
    };

    const saveTaskName = (index) => {
        const updatedTasks = tasks.map((task, i) => i === index ? {...task, name: editedTaskName} : task);
        setTasks(updatedTasks);
        setEditingIndex(null);
        setEditedTaskName(""); // Reset the edited name
    };

    const cancelTask = (index) => {
        if (!tasks[index].name) { // Check if the task name is still empty
            const updatedTasks = tasks.filter((_, i) => i !== index); // Remove the empty task
            setTasks(updatedTasks);
        }
        setEditingIndex(null); // Exit editing mode
        setEditedTaskName(""); // Reset the edited name
    };

    return (<div className="sidebar">
        <div className="user-section">
            <div className="user-icon"></div>
            <p>{localStorage.getItem('name') || 'User'}</p>
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
                                onBlur={() => saveTaskName(i)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") saveTaskName(i);
                                }}
                                onChange={(e) => setEditedTaskName(e.target.value)}
                            />
                        </div>
                        <div className="edit-buttons">
                            <button onClick={() => saveTaskName(i)} className="save-task">
                                💾
                            </button>
                            <button onClick={() => cancelTask(i)} className="cancel-task">
                                ❌
                            </button>
                        </div>
                    </>) : (<>
                        <button className="remove-task" onClick={() => removeTask(i)}>❌</button>
                        <span>{task.name}</span>
                        <button className="edit-task" onClick={() => startEditing(i)}>✏️</button>
                    </>)}
                </div>))}
            </div>
            {tasks.length < 10 && (<div className="button-section" onClick={addTask}>
                <p>+ Add new</p>
            </div>)}
        </div>

        <div className="date-section">
            <p>{currentDate.day}</p>
            <p>{currentDate.month}</p>
            <p>{currentDate.year}</p>
        </div>

        <div className="button-section">
            <p>SETTINGS</p>
            <p onClick={handleLogout}>LOG OUT</p>
        </div>
    </div>);
};

export default Sidebar;

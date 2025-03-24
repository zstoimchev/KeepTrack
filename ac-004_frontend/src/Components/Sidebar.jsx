import React, { useState } from "react";
import "./Sidebar.css";
import {useNavigate} from "react-router-dom";

const Sidebar = ({ onLogout }) => {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    const [editingIndex, setEditingIndex] = useState(null);
    const [editedTaskName, setEditedTaskName] = useState("");

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    }

    const addTask = () => {
        if (tasks.length < 10) {
            const newTask = `TIME | TASK ${tasks.length + 1}`;
            setTasks([...tasks, newTask]);
        }
    };

    const removeTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const startEditing = (index) => {
        setEditingIndex(index);
        setEditedTaskName(tasks[index]);
    };

    const saveTaskName = (index) => {
        const updatedTasks = tasks.map((task, i) => 
            i === index ? editedTaskName : task 
        );

        setTasks(updatedTasks);
        setEditingIndex(null);
    };

    return (
    <div className="sidebar">

        <div className="user-section">
            <div className="user-icon"></div>
            <p>User</p>
        </div>

        <div className="tasks-section">
                <p>Long-Term Tasks</p>

                <div className="task-container">

                    {tasks.map((task, i) => (

                        <div key={i} className="task">

                            {editingIndex === i ? (

                                <input
                                    type="text"
                                    value={editedTaskName}
                                    onChange={(e) => setEditedTaskName(e.target.value)}
                                    onBlur={() => saveTaskName(i)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") saveTaskName(i);
                                    }}
                                    autoFocus
                                />

                            ) : (

                                <>
                                    <button className="remove-task" onClick={() => removeTask(i)}>❌</button>
                                        <span>
                                            {task}
                                        </span>
                                    <button className="edit-task" onClick={() => startEditing(i)}>✏️</button>
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
            <p>02</p>
            <p>JULY</p>
            <p>2021</p>
        </div>

        <div className="button-section">
            <p>SETTINGS</p>
            <p onClick={handleLogout}>LOG OUT</p>
        </div>

    </div>
    );
};

export default Sidebar;
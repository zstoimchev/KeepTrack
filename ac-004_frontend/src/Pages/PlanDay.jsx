import React, { useState } from 'react';
import './Planday.css';

function PlanDay() {
    const [tasks, setTasks] = useState([
        { id: 1, name: 'Chore x', priority: 'High', duration: '20 min' },
        { id: 2, name: 'Chore x', priority: 'Low', duration: '1 hour' },
        { id: 3, name: 'Chore x', priority: 'Medium', duration: '20 min' },
        { id: 4, name: 'Chore x', priority: 'Low', duration: '45 min' },
    ]);

    const addNewTask = () => {
        const newTask = { id: tasks.length + 1, name: 'New Task', priority: 'Low', duration: '30 min' };
        setTasks([...tasks, newTask]);
    };

    const calculateProgress = () => {
        // Calculate progress as a percentage of completed tasks out of a fixed total.
        const totalTasks = 10; // Adjust this number based on your app requirements
        return (tasks.length / totalTasks) * 100;
    };

    return (
        <div className="DynamicContainer">
            <div className="Header">
                <h1>Tasks for the Day</h1>
                <p>Organize your tasks and priorities</p>
            </div>

            <div className="ScrollableTaskList">
                {tasks.map(task => (
                    <div key={task.id} className="TaskItem">
                        <p>{task.name}</p>
                        <p>{task.priority}</p>
                        <p>{task.duration}</p>
                    </div>
                ))}
                <div className="AddTaskButton" onClick={addNewTask}>
                    <p>+ Add new</p>
                </div>
            </div>
            <div className="ProgressTracker">
                <p>Progress Tracker</p>
                <div className="ProgressBar">
                    <div className="Progress" style={{width: `${calculateProgress()}%`}}></div>
                </div>
            </div>
        </div>
    );
}

export default PlanDay;

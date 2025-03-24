import React, { useState } from 'react';
import './Planday.css';

function PlanDay() {
    const [tasks, setTasks] = useState([
        { id: 1, name: 'Math', priority: 'Low', duration: '30 min', completed: false },
        { id: 2, name: 'Programming', priority: 'High', duration: '1 hour', completed: false },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newTask, setNewTask] = useState({
        name: '',
        priority: 'Low',
        duration: ''
    });

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setNewTask({
            name: '',
            priority: 'Low',
            duration: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePriorityChange = (priority) => {
        setNewTask(prev => ({
            ...prev,
            priority
        }));
    };

    const toggleTaskCompletion = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? {...task, completed: !task.completed} : task
        ));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newTask.name.trim() || !newTask.duration.trim()) return;

        const taskToAdd = {
            id: tasks.length + 1,
            name: newTask.name,
            priority: newTask.priority,
            duration: newTask.duration,
            completed: false
        };

        setTasks([...tasks, taskToAdd]);
        closeModal();
    };

    const calculateProgress = () => {
        const completedCount = tasks.filter(task => task.completed).length;
        return (completedCount / tasks.length) * 100 || 0;
    };

    const calculatePriorityProgress = (priority) => {
        const priorityTasks = tasks.filter(task => task.priority === priority);
        if (priorityTasks.length === 0) return 0;
        const completedCount = priorityTasks.filter(task => task.completed).length;
        return (completedCount / priorityTasks.length) * 100;
    };

    return (
        <div className="PlanDayContainer">
            <h1 className="DateHeader">02 July 2021</h1>

            <div className="TasksSection">
                <h2>Tasks for the day: Time Period</h2>
                <ul className="TaskList">
                    {tasks.map(task => (
                        <li key={task.id} className={`TaskItem ${task.priority.toLowerCase()} ${task.completed ? 'completed' : ''}`}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTaskCompletion(task.id)}
                                className="TaskCheckbox"
                            />
                            <span className="TaskName">
                                {task.name}: {task.priority} {task.duration}
                            </span>
                        </li>
                    ))}
                    <li className="TaskItem add-new">
                        <button className="AddButton" onClick={openModal}>
                            + Add new:
                        </button>
                    </li>
                </ul>
            </div>

            <div className="ProgressSection">
                <h2>Progress Tracker for today</h2>
                <div className="ProgressBarContainer">
                    <div className="MultiColorProgress">
                        {['High', 'Medium', 'Low'].map(priority => (
                            <div
                                key={priority}
                                className={`ProgressSegment ${priority.toLowerCase()}`}
                                style={{
                                    width: `${calculatePriorityProgress(priority)}%`,
                                    backgroundColor:
                                        priority === 'High' ? '#e74c3c' :
                                            priority === 'Medium' ? '#f39c12' :
                                                '#27ae60'
                                }}
                            />
                        ))}
                    </div>
                </div>
                <div className="ProgressText">
                    {Math.round(calculateProgress())}% completed
                    <div className="PriorityLegend">
                        <span className="LegendItem high">High</span>
                        <span className="LegendItem medium">Medium</span>
                        <span className="LegendItem low">Low</span>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="Modal">
                    <div className="ModalContent">
                        <div className="ModalHeader">
                            <h3>Add New Task</h3>
                            <button className="CloseButton" onClick={closeModal}>×</button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="FormGroup">
                                <label htmlFor="taskName">Task Name</label>
                                <input
                                    id="taskName"
                                    type="text"
                                    name="name"
                                    value={newTask.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter task name"
                                    required
                                />
                            </div>

                            <div className="FormGroup">
                                <label>Priority</label>
                                <div className="PriorityOptions">
                                    {['Low', 'Medium', 'High'].map(level => (
                                        <button
                                            key={level}
                                            type="button"
                                            className={`PriorityButton ${newTask.priority === level ? 'active' : ''}`}
                                            onClick={() => handlePriorityChange(level)}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="FormGroup">
                                <label htmlFor="duration">Duration</label>
                                <input
                                    id="duration"
                                    type="text"
                                    name="duration"
                                    value={newTask.duration}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 30 min, 1 hour"
                                    required
                                />
                            </div>

                            <div className="ModalActions">
                                <button type="button" className="CancelButton" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="SubmitButton">
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PlanDay;
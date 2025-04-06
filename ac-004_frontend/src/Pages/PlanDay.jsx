import React, {useEffect, useState} from 'react';
import './Planday.css';
import axios from "axios";

function PlanDay() {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '', priority: 'Low', duration: ''
    });

    const [currentDate, setCurrentDate] = useState({day: "", month: "", year: "", formatted: ""});

    const [timeInput, setTimeInput] = useState({
        hours: '',
        minutes: '' ,
    });

    const fetchTasks = async (formatted) => {
        try {
            const user_id = localStorage.getItem("id");
            const response = await axios.post("http://localhost:3000/tasks/get-date", {
                user_id, date: formatted
            });
            if (response.status === 200) {
                setTasks(response.data.tasks.map(task => {

                    const hours = Math.floor(task.duration / 60);
                    const minutes = task.duration % 60;
                    
                    return {
                        id: task.id || null,
                        title: task.title || 'Untitled Task',
                        priority: task.priority || 'Low',
                        duration: task.duration || 0,
                        displayDuration: `${hours}h ${minutes}m`,
                        completed: task.is_finished || false
                      };
                }));
            } else {
                alert(response.data.msg);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error?.response?.data || error.message);
        }
    };

    useEffect(() => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, "0");
        const month = date.toLocaleString("en-US", {month: "long"}).toUpperCase();
        const month_num = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear().toString();
        const formatted = `${year}-${month_num}-${day}`;

        // Set the current date
        setCurrentDate({day, month, year, formatted});

        fetchTasks(formatted);
    }, []); // Runs only once on component mount

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setNewTask({
            title: '', priority: 'Low', duration: ''
        });
        setTimeInput({hours:'', minutes: ''});
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewTask(prev => ({
            ...prev, [name]: value
        }));
    };

    const handlePriorityChange = (priority) => {
        setNewTask(prev => ({
            ...prev, priority
        }));
    };

    const handleTimeChange = (e, field) => {
        let value = e.target.value;
        
        if (value.length > 2) return;
        if (field === 'hours' && parseInt(value) > 23) value = '23';
        if (field === 'minutes' && parseInt(value) > 59) value = '59';
        
        setTimeInput(prev => ({
          ...prev,
          [field]: value
        }));
    };

    const toggleTaskCompletion = async (id, currentStatus) => {
        try {
            const response = await axios.put(`http://localhost:3000/tasks/update-completion/${id}`);

            if (response.status === 200) {
                setTasks(prevTasks => prevTasks.map(task => task.id === id ? {
                    ...task, completed: !currentStatus
                } : task));
            } else {
                alert(response.data.msg || "Failed to update task status.");
            }
        } catch (error) {
            console.error("Error updating task status:", error?.response?.data || error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const totalMinutes = (parseInt(timeInput.hours) || 0) * 60 +
            (parseInt(timeInput.minutes) || 0);

        if (!newTask.title.trim() || totalMinutes <= 0) {
            alert("Please enter a title and valid duration");
            return;
        } 

        try {
            const user_id = localStorage.getItem("id");
            const response = await axios.post("http://localhost:3000/tasks/add", {
                user_id,
                title: newTask.title,
                date: currentDate.formatted,
                priority: newTask.priority,
                duration: totalMinutes,
            });

            if (response.status === 201) {
                closeModal();
                fetchTasks(currentDate.formatted); // Fetch the updated task list
            } else {
                alert(response.data.msg || "Failed to add task.");
            }
        } catch (error) {
            console.error("Error adding task:", error?.response?.data || error.message);
        }
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

    const deleteTask = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/tasks/delete/${id}`);
            if (response.status === 200) {
                // Filter out the deleted task from the state
                setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
            } else {
                alert(response.data.msg || "Failed to delete task.");
            }
        } catch (error) {
            console.error("Error deleting task:", error?.response?.data || error.message);
        }
    };

    return (
    <div className="PlanDayContainer">
        <h1 className="DateHeader">To-Do List for day: {currentDate.day} {currentDate.month}, {currentDate.year}</h1>

        <div className="TasksSection">
            <h2>Tasks for the day: Time Period</h2>
            {tasks.length === 0 ? (<div className="NoTasksMessage">
                <p>No tasks for today. Add new tasks to kickstart your day!</p>
                {/*<li className="TaskItem add-new">*/}
                    {/*<button className="AddButton" onClick={openModal}>*/}
                    {/*    + Add new:*/}
                    {/*</button>*/}
                {/*</li>*/}
            </div>) : (<ul className="TaskList">
                {tasks.map((task) => (<li
                    key={task.id}
                    className={`TaskItem ${task.priority && typeof task.priority === 'string' ? task.priority.toLowerCase() : ''} ${task.completed ? 'completed' : ''}`}
                >
                    <input
                        type="checkbox"
                        checked={task.completed} // TODO: call API to mark complete
                        onChange={() => toggleTaskCompletion(task.id, task.completed)}
                        className="TaskCheckbox"
                    />
                    <span className="TaskName">
                        {task.title}: {task.priority}, {task.displayDuration} minutes
                    </span>
                    <button
                        className="DeleteButton"
                        onClick={() => deleteTask(task.id)}
                    >
                        Delete
                    </button>
                </li>))}
                {/*<li className="TaskItem add-new">*/}
                {/*    <button className="AddButton" onClick={openModal}>*/}
                {/*        + Add new:*/}
                {/*    </button>*/}
                {/*</li>*/}
            </ul>)}
        </div>
        <div className="TaskItem add-ne divClassButtonFor">
            <button className="AddButton no-decor" onClick={openModal}>
                + Add new task
            </button>
        </div>

        {/*<hr className="AddTaskSeparator"/>*/}
        <div className="ProgressSection">
            <h2>Progress Tracker for today</h2>
            <div className="ProgressBarContainer">
                <div className="MultiColorProgress">
                    {['High', 'Medium', 'Low'].map(priority => (<div
                        key={priority}
                        className={`ProgressSegment ${priority.toLowerCase()}`}
                        style={{
                            width: `${calculatePriorityProgress(priority)}%`,
                            backgroundColor: priority === 'High' ? '#e74c3c' : priority === 'Medium' ? '#f39c12' : '#27ae60'
                        }}
                    />))}
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

            {showModal && (<div className="Modal">
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
                            name="title"
                            value={newTask.title}
                            onChange={handleInputChange}
                            placeholder="Enter task name"
                            required
                        />
                    </div>

                    <div className="FormGroup">
                        <label>Priority</label>
                        <div className="PriorityOptions">
                            {['Low', 'Medium', 'High'].map(level => (<button
                                key={level}
                                type="button"
                                className={`PriorityButton ${newTask.priority === level ? 'active' : ''}`}
                                onClick={() => handlePriorityChange(level)}
                            >
                                {level}
                            </button>))}
                        </div>
                    </div>

                    <div className="FormGroup">
                        <label htmlFor="duration">Duration</label>
                            <div className="duration-input">
                                <input
                                    type="number"
                                    value={timeInput.hours}
                                    onChange={(e) => handleTimeChange(e, 'hours')}
                                    placeholder="00"
                                    min="0"
                                    max="23"
                                    maxLength={2}
                                />
                                <span>Hours</span>

                                <input
                                    type="number"
                                    value={timeInput.minutes}
                                    onChange={(e) => handleTimeChange(e, 'minutes')}
                                    placeholder="00"
                                    min="0"
                                    max="59"
                                    maxLength={2}
                                />
                            <span>Minutes</span>
                        </div>
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
        </div>)}
    </div>);
}

export default PlanDay;
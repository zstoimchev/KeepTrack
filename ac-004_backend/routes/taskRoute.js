import express from 'express';
import {
    addTask,
    getTasksByUser,
    getTasksByDate,
    getTasksByMonth,
    deleteTask,
    updateTaskCompletion,
    getLongTermTasks,
    updateLongTermTask,
    getShortTermByUserId,
    updateTaskFinished,
    updateTaskPriority
} from '../controllers/taskController.js';

const tasks = express.Router();

tasks.post('/add', addTask);
tasks.post('/get-user', getTasksByUser);
tasks.post('/get-date', getTasksByDate);
tasks.get('/get-month', getTasksByMonth);
tasks.delete('/delete/:id', deleteTask);
tasks.put('/update-completion/:id', updateTaskCompletion);
tasks.get('/long-term/all/:id', getLongTermTasks);
tasks.put('/long-term/update/:id', updateLongTermTask);
tasks.get('/short-term/:id', getShortTermByUserId);
tasks.put('/tasks/:id/finish', updateTaskFinished);
tasks.patch('/:id/priority', updateTaskPriority);

export default tasks;

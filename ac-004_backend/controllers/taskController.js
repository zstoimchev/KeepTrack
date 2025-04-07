import taskModel from '../models/taskModel.js';

export const addTask = async (req, res) => {
    try {
        const { title, user_id, date, priority, duration } = req.body;
        if (!title || !user_id || !date || !priority || !duration) {
            return res.status(400).json({ success: false, msg: 'All fields are required' });
        }
        const task = { title, user_id, date, priority, duration, is_finished: false };
        const result = await taskModel.addTask(task);
        res.status(201).json({ success: true, msg: 'Task added successfully!', id: result.id });
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

export const getTasksByUser = async (req, res) => {
    try {
        const { user_id } = req.body;
        if (!user_id) {
            return res.status(400).json({ success: false, msg: 'User ID is required' });
        }
        const tasks = await taskModel.getTasksByUserID(user_id);
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        console.error('Error fetching tasks by user:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

export const getTasksByDate = async (req, res) => {
    try {
        const { user_id, date } = req.body;
        if (!user_id || !date) {
            return res.status(400).json({ success: false, msg: 'User ID and date are required' });
        }
        const tasks = await taskModel.getTasksByDay(user_id, date);
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        console.error('Error fetching tasks by date:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

export const getTasksByMonth = async (req, res) => {
    try {
        const { user_id, month } = req.body;
        if (!user_id || !month) {
            return res.status(400).json({ success: false, msg: 'User ID and month are required' });
        }
        const tasks = await taskModel.getTasksByMonth(user_id, `${month}%`);
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        console.error('Error fetching tasks by month:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, msg: 'Task ID is required' });
        }
        await taskModel.deleteTask(id);
        res.status(200).json({ success: true, msg: 'Task deleted successfully!' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

export const updateTaskCompletion = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, msg: 'Task ID is required' });
        }
        await taskModel.updateTask(id, { is_finished: true });
        res.status(200).json({ success: true, msg: 'Task completion status updated!' });
    } catch (error) {
        console.error('Error updating task completion:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

export const getLongTermTasks = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, msg: 'User ID is required' });
        }
        const tasks = await taskModel.getLongTermTasksByUserId(id);
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        console.error('Error fetching long-term tasks:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

export const updateLongTermTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, duration } = req.body;
        if (!id || !title || !duration) {
            return res.status(400).json({ success: false, msg: 'Task ID, title, and duration are required' });
        }
        await taskModel.updateLongTermTask(id, title, duration);
        res.status(200).json({ success: true, msg: 'Long-term task updated successfully!' });
    } catch (error) {
        console.error('Error updating long-term task:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

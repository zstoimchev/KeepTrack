const express = require("express")
const tasks = express.Router()
const DB = require('../DB/queries')

tasks.post('/add', async (req, res) => {
    try {
        const {title, user_id, date, priority, duration} = req.body
        try {
            const queryResult = await DB.addTask(title, user_id, date, priority, duration)
            if (!(queryResult.affectedRows)) {
                return res.status(503).json({success: false, msg: "Error adding new task..."})
            }
            res.status(201).json({success: true, msg: "Task added successfully!"})
        } catch (err) {
            console.error(err)
            return res.status(503).json({success: false, msg: "Error while adding task"})
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({success: false, msg: "The server snapped..."})
    }
})

tasks.get('/get-user/', async (req, res) => {
    try {
        try {
            const queryResult = await DB.getTasksByID(req.body.user_id)
            if (queryResult.length <= 0) {
                return res.status(404).json({success: false, msg: "No tasks fetched..."})
            }
            res.status(200).json({success: true, msg: "Tasks fetched successfully!", tasks: queryResult})
        } catch (err) {
            console.error(err)
            return res.status(503).json({success: false, msg: "Error while fetching tasks"})
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({success: false, msg: "The server snapped..."})
    }
})

tasks.post('/get-date/', async (req, res) => {
    try {
        try {
            const {user_id, date} = req.body
            const queryResult = await DB.getTasksByDay(user_id, date)
            if (queryResult.length <= 0) {
                return res.status(404).json({success: false, msg: "No tasks fetched..."})
            }
            res.status(200).json({success: true, msg: "Tasks fetched successfully!", tasks: queryResult})
        } catch (err) {
            console.error(err)
            return res.status(503).json({success: false, msg: "Error while fetching tasks"})
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({success: false, msg: "The server snapped..."})
    }
})

tasks.get('/get-month/', async (req, res) => {
    try {
        try {
            const {user_id, month} = req.body
            const queryResult = await DB.getTasksByMonth(user_id, month + "%")
            if (queryResult.length <= 0) {
                return res.status(404).json({success: false, msg: "No tasks fetched..."})
            }
            res.status(200).json({success: true, msg: "Tasks fetched successfully!", tasks: queryResult})
        } catch (err) {
            console.error(err)
            return res.status(503).json({success: false, msg: "Error while fetching tasks"})
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({success: false, msg: "The server snapped..."})
    }
})

tasks.delete('/delete', async (req, res) => {
    try {
        try {
            const {id} = req.body
            const queryResult = await DB.deleteTask(id)
            if (queryResult.length <= 0) {
                return res.status(404).json({success: false, msg: "No task deleted..."})
            }
            res.status(200).json({success: true, msg: "Task deleted successfully!"})
        } catch (err) {
            console.error(err)
            return res.status(503).json({success: false, msg: "Error while deleting task"})
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({success: false, msg: "The server snapped..."})
    }
})

module.exports = tasks
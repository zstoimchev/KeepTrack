const express = require("express")
const tasks = express.Router()
const DB = require('../DB/queries')
const moment = require('moment-timezone');

tasks.get('/all', async (req, res) => {
    try {
        try {
            let queryResult = await DB.allTasks()
            if (queryResult.length <= 0) {
                return res.status(404).json({success: false, msg: "No tasks fetched..."})
            }
            return res.status(200).json({success: true, msg: "Tasks fetched!", tasks: queryResult})
        } catch (error) {
            console.error(error)
            return res.status(503).json({
                success: false, msg: "Error while fetching tasks"
            })
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({success: false, msg: "The server snapped..."})
    }
})

tasks.post('/add', async (req, res) => {
    try {
        const {title, user_id, date, priority} = req.body
        const dateObj = new Date(date)
        console.log(dateObj)
        try {
            const queryResult = await DB.addTask(title, user_id, dateObj, priority)
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

tasks.get('/get-user/:user', async (req, res) => {
    try {
        try {
            const queryResult = await DB.getTasksByID(req.params.user);
            if (queryResult.length <= 0) {
                return res.status(404).json({success: false, msg: "No tasks fetched..."})
            }
            res.status(201).json({success: true, msg: "Tasks fetched successfully!", tasks: queryResult});
        } catch (err) {
            console.error(err)
            return res.status(503).json({success: false, msg: "Error while fetching tasks"})
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({success: false, msg: "The server snapped..."})
    }
})

tasks.get('/get-date/:day', async (req, res) => {
    try {
        try {
            const day = new Date(req.params.day).toISOString()
            console.log(day)
            const queryResult = await DB.getTasksByDay(day)
            console.log(queryResult)
            if (queryResult.length <= 0) {
                return res.status(404).json({success: false, msg: "No tasks fetched..."})
            }
            queryResult[0].date = moment.utc(queryResult[0].date).tz('Europe/Ljubljana').format('YYYY-MM-DD')
            res.status(201).json({success: true, msg: "Tasks fetched successfully!", tasks: queryResult});
        } catch (err) {
            console.error(err)
            return res.status(503).json({success: false, msg: "Error while fetching tasks"})
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({success: false, msg: "The server snapped..."})
    }
})

module.exports = tasks
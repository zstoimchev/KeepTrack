import express from 'express'
import DB from '../DB/queries.js'

const users = express.Router()

users.get('/all', async (req, res) => {
    try {
        try {
            let queryResult = await DB.allUsers()
            if (queryResult.length <= 0) {
                return res.status(404).json({success: false, msg: "No accounts fetched..."})
            }
            return res.status(200).json({success: true, msg: "Accounts fetched!", users: queryResult})
        } catch (error) {
            console.error(error)
            return res.status(503).json({
                success: false, msg: "Error while fetching users"
            })
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({success: false, msg: "The server snapped..."})
    }
})

users.post('/register', async (req, res) => {
    try {
        const {name, surname, email, password} = req.body;
        if (!name || !surname || !email || !password) {
            return res.status(400).json({success: false, msg: "Please enter valid data!"})
        }
        try {
            let tmp = await DB.getUserByEmail(email)
            if (tmp.length > 0) {
                return res.status(400).json({success: false, msg: "Email is already taken"});
            }
            const queryResult = await DB.addUser(name, surname, email, password);
            if (!(queryResult.affectedRows)) {
                return res.status(503).json({success: false, msg: "Error registering new user..."})
            }
            res.status(201).json({success: true, msg: "User added successfully!"});
        } catch (err) {
            console.error(err)
            return res.status(503).json({success: false, msg: "Error while adding user"})
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({success: false, msg: "The server snapped..."})
    }
})

users.post('/login', async (req, res, next) => {
    console.log("---")
    try {
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(400).json({success: false, msg: "Please enter both email & password!"})
        }
        let queryResult = null
        queryResult = await DB.getUserByEmail(email)
        if (queryResult.length <= 0) {
            return res.status(404).json({success: false, msg: "User does not exist. Please create an account!"})
        }
        if (queryResult[0].password !== password) {
            return res.status(400).json({success: false, msg: "Password must match!"})
        }
        return res.status(200).json({
            success: true, user: {
                id: queryResult[0].id, email: queryResult[0].email, name: queryResult[0].name,
            }, msg: "User is logged in!"
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({success: false, msg: `Internal server error! Try again later.`})
    }
})

export default users
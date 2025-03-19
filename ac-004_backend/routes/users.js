const express = require("express")
const users = express.Router()
const DB = require('../DB/queries')

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

users.post('/add', async (req, res) => {
    try {
        const {name, surname, email, password} = req.body;
        const newUser = {name, email, password};

        try {
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
});


module.exports = users
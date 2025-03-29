const express = require('express')
const cors = require("cors")
const path = require("path")
const PORT = process.env.PORT || 3000
const app = express()
const db = require('./DB/queries')

app.use(express.json());
app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'PUT'], credentials: true, origin: ['http://localhost:5173'],
}))

const users = require("./routes/users")
const tasks = require("./routes/tasks")
app.use('/users', users)
app.use('/tasks', tasks)

// app.use(express.static(path.join(__dirname, "dist")))

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, "dist", "index.html"))
// })

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
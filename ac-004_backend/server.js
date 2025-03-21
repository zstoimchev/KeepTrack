const express = require('express')
const cors = require("cors")
const PORT = process.env.PORT || 3000
const app = express()
const db = require('./DB/queries')

app.use(express.json());
app.use(cors({
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
    origin: ['http://localhost:5173/'],
}))

const users = require("./routes/users")
const tasks = require("./routes/tasks")
app.use('/users', users)
app.use('/tasks', tasks)


app.get('/', (req, res) => {
    res.json({success: true, msg: "it is working dzonii"})
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
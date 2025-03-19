const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const db = require('./DB/queries');

app.use(express.json());


const users = require("./routes/users")
app.use('/users', users)


app.get('/', (req, res) => {
    res.json({success: true, msg: "it is working dzonii"})
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
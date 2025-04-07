import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
})

connection.connect((err) => {
    if (err) {
        console.log("ERROR: " + err)
        return
    }
    console.log('Connection with the DB established')
})

export default connection
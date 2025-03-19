const connection = require('./dbConfig');

let dataPool = {}

dataPool.allUsers = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM User', (err, res) => {
            if (err) {
                return reject(err)
            }
            return resolve(res)
        })
    })
}

dataPool.allTasks = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Calendar', (err, res) => {
            if (err) {
                return reject(err)
            }
            return resolve(res)
        })
    })
}

dataPool.addUser = (name, surname, email, password) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO User (name, surname, email, password)
                          VALUES (?, ?, ?, ?)`, [name, surname, email, password], (err, res) => {
            if (err) {
                return reject(err)
            }
            return resolve(res)
        })
    })
}

dataPool.addTask = (title, user_id, date, priority) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO Calendar (title, user_id, date, priority)
                          VALUES (?, ?, ?, ?)`, [title, user_id, date, priority], (err, res) => {
            if (err) {
                return reject(err)
            }
            return resolve(res)
        })
    })
}

module.exports = dataPool
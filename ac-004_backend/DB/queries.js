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

dataPool.getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM User WHERE email = ?', [email], (err, res, fields) => {
            if (err) { return reject(err) }
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

dataPool.getTasksByID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Calendar WHERE user_id = ?', [id], (err, res, fields) => {
            if (err) { return reject(err) }
            return resolve(res)
        })
    })
}

dataPool.oneTask = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Calendar WHERE id = 15', (err, res, fields) => {
            if (err) { return reject(err) }
            return resolve(res)
        })
    })
}

dataPool.getTasksByDay = (date) => {
    return new Promise((resolve, reject) => {
        const datePattern = `${date}T%`;
        connection.query('SELECT * FROM Calendar WHERE date LIKE ?', [datePattern], (err, res, fields) => {
            if (err) { return reject(err) }
            return resolve(res)
        })
    })
}

module.exports = dataPool
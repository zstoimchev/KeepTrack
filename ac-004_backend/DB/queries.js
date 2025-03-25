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
        connection.query('SELECT * FROM User WHERE email = ?', [email], (err, res) => {
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

dataPool.addTask = (title, user_id, date, priority, duration) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO Calendar (title, user_id, date, priority, duration)
                          VALUES (?, ?, ?, ?, ?)`, [title, user_id, date, priority, duration], (err, res) => {
            if (err) {
                return reject(err)
            }
            return resolve(res)
        })
    })
}

dataPool.getTasksByID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Calendar WHERE user_id = ?', [id], (err, res) => {
            if (err) {
                return reject(err)
            }
            return resolve(res)
        })
    })
}

dataPool.oneTask = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Calendar WHERE id = 15', (err, res) => {
            if (err) {
                return reject(err)
            }
            return resolve(res)
        })
    })
}

dataPool.getTasksByDay = (user_id, date) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Calendar WHERE user_id = ? AND date = ?', [user_id, date], (err, res) => {
            if (err) {
                return reject(err)
            }
            return resolve(res)
        })
    })
}

dataPool.getTasksByMonth = (user_id, month) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Calendar WHERE user_id = ? AND date LIKE ?', [user_id, month], (err, res) => {
            if (err) {
                return reject(err)
            }
            return resolve(res)
        })
    })
}

dataPool.deleteTask = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM Calendar WHERE id = ?', [id], (err, res) => {
            if (err) {
                return reject(err)
            }
            return resolve(res)
        })
    })
}

module.exports = dataPool
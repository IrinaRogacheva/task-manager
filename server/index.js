const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Qwerty123',
    database: 'task_manager',
})

app.get('/api/get_tasks', (req, res) => {
    const selectTasks = "SELECT * FROM `task` WHERE `status` = 0 ORDER BY `id_task` DESC"
    db.query(selectTasks,(err, result) => {
        res.send(result)
    })
})

app.get('/api/get_done_tasks', (req, res) => {
    const selectTasks = "SELECT * FROM `task` WHERE `status` = 1 ORDER BY `id_task` DESC"
    db.query(selectTasks,(err, result) => {
        res.send(result)
    })
})

app.get('/api/get_deleted_tasks', (req, res) => {
    const selectTasks = "SELECT * FROM `task` WHERE `status` = 2 ORDER BY `id_task` DESC"
    db.query(selectTasks,(err, result) => {
        res.send(result)
    })
})

app.get('/api/get_today_tasks/:date', (req, res) => {
    const date = req.params.date
    const selectTasks = "SELECT * FROM `task` WHERE `status` = 0 AND `date` = ? ORDER BY `id_task` DESC"
    db.query(selectTasks,[date],(err, result) => {
        res.send(result)
    })
})

app.get('/api/get_count_of_incoming', (req, res) => {
    const query = "SELECT COUNT(`id_task`) AS countOfIncoming FROM `task` WHERE `status` = 0"
    db.query(query,(err, result) => {
        res.send(result)
    })
})

app.get('/api/get_count_of_today/:date', (req, res) => {
    const date = req.params.date
    const query = "SELECT COUNT(`id_task`) AS countOfToday FROM `task` WHERE `status` = 0 AND `date` = ?"
    db.query(query,[date],(err, result) => {
        res.send(result)
    })
})

app.delete('/api/delete_tasks', (req, res) => {
    const query = "DELETE FROM `task` WHERE `status` = 2"
    db.query(query,(err, result) => {
        res.send(result)
    })
})

app.post('/api/add_task', (req, res) => {
    const taskName = req.body.name
    console.log("name: " + taskName)
    const date = req.body.date
    console.log("date: " + date)
    const priority = req.body.priority
    const idAuthor = req.body.id_author

    const insertTask = "INSERT INTO `task` (`name`, `date`, `priority`, `id_author`) VALUES (?, ?, ?, ?)"
    db.query(insertTask, [taskName, date, priority, idAuthor],(err, result) => {
        console.log(result)
    })
})

app.put('/api/update_task/:id_task', (req, res) => {
    const idTask = req.params.id_task
    const status = req.body.status

    const updateTask = "UPDATE `task` SET `status`= ? WHERE `id_task`=?"
    db.query(updateTask, [status, idTask],(err, result) => {
        console.log(result)
    })
})

app.listen(3001, () => {
    console.log('running on port 3001')
})
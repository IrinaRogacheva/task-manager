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
    const selectTasks = "SELECT * FROM `task`"
    db.query(selectTasks,(err, result) => {
        res.send(result)
    })
})

app.post('/api/add_task', (req, res) => {
    const taskName = req.body.taskName

    const insertTask = "INSERT INTO `task` (`name`, `id_author`) VALUES (?, 1)"
    db.query(insertTask, [taskName],(err, result) => {
        console.log(result)
    })
})

app.listen(3001, () => {
    console.log('running on port 3001')
})
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
    const selectTasks = "SELECT * FROM `task` ORDER BY `id_task` DESC"
    db.query(selectTasks,(err, result) => {
        res.send(result)
    })
})

app.post('/api/add_task', (req, res) => {
    const taskName = req.body.name
    const priority = req.body.priority
    const idAuthor = req.body.id_author

    const insertTask = "INSERT INTO `task` (`name`, `priority`, `id_author`) VALUES (?, ?, ?)"
    db.query(insertTask, [taskName, priority, idAuthor],(err, result) => {
        console.log(result)
    })
})

app.listen(3001, () => {
    console.log('running on port 3001')
})
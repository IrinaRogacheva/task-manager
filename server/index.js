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

app.get('/api/get_tasks_of_project/:id', (req, res) => {
    const id = req.params.id
    
    const query = "SELECT * FROM `task` WHERE `id_project` = ? AND `status` = 0;"
    db.query(query,[id],(err, result) => {
        res.send(result)
    })
})

app.get('/api/get_tasks_of_tag/:id', (req, res) => {
    const id = req.params.id
    
    const query = "SELECT `task`.`id_task`, `name`, `description`, `date`, `time`, `priority`, `id_parent_task`, `id_project`, `id_tag`, `id_author`, `status` FROM `task` INNER JOIN `task_in_tag` ON `task`.`id_task` = `task_in_tag`.`id_task` WHERE `task_in_tag`.`id_tag` = ? AND `status` = 0"
    db.query(query,[id],(err, result) => {
        res.send(result)
    })
})

app.delete('/api/delete_tasks', (req, res) => {
    const query = "DELETE FROM `task` WHERE `status` = 2"
    db.query(query,(err, result) => {
        res.send(result)
    })
})

app.get('/api/get_task_by_id/:id', (req, res) => {
    const id = req.params.id
    const selectTasks = "SELECT * FROM `task` WHERE `id_task` = ?"
    db.query(selectTasks, [id],(err, result) => {
        res.send(result)
    })
})

app.post('/api/add_task', (req, res) => {
    const taskName = req.body.name
    const date = req.body.date
    const priority = req.body.priority
    const idProject = req.body.id_project
    const idAuthor = req.body.id_author

    const insertTask = "INSERT INTO `task` (`name`, `date`, `priority`, `id_project`, `id_author`) VALUES (?, ?, ?, ?, ?)"
    db.query(insertTask, [taskName, date, priority, idProject, idAuthor],(err, result) => {
        res.send(result)
    })
})

app.put('/api/update_task_status/:id_task', (req, res) => {
    const idTask = req.params.id_task
    const status = req.body.status

    console.log("task status: "+ status)
    const updateTask = "UPDATE `task` SET `status`= ? WHERE `id_task`=?"
    db.query(updateTask, [status, idTask],(err, result) => {
        console.log(result)
        res.send(result)
    })
})


app.put('/api/update_task_name/:id_task', (req, res) => {
    const idTask = req.params.id_task
    const taskName = req.body.name

    console.log("task name: "+ taskName)
    const updateTask = "UPDATE `task` SET `name` = ? WHERE `id_task`=?"
    db.query(updateTask, [taskName, idTask],(err, result) => {
        res.send(result)
    })
})

app.get('/api/get_project/:id', (req, res) => {
    const id = req.params.id
    const selectProject = "SELECT * FROM `project` WHERE `id_project` = ?"
    db.query(selectProject, [id],(err, result) => {
        res.send(result)
    })
})

app.get('/api/get_count_of_tasks_in_project/:id', (req, res) => {
    const id = req.params.id

    const query = "SELECT COUNT(`id_task`) AS count FROM `task` WHERE `id_project` = ? AND `status` = 0;"
    db.query(query,[id],(err, result) => {
        res.send(result)
    })
})

app.get('/api/get_projects', (req, res) => {
    const query = "SELECT * FROM `project`"

    db.query(query,(err, result) => {
        res.send(result)
    })
})

app.post('/api/add_project', (req, res) => {
    const projectName = req.body.name
    const color = req.body.color
    
    const insertTask = "INSERT INTO `project` (`name`, `color`) VALUES (?, ?)"
    db.query(insertTask, [projectName, color],(err, result) => {
        console.log(result)
        res.send(result)
    })
})

app.post('/api/add_tag_to_task', (req, res) => {
    const idTask = req.body.id_task
    const idTag = req.body.id_tag
    console.log("idTask: "+idTask)
    console.log("idTag: "+idTag)

    const insertTask = "INSERT INTO `task_in_tag` (`id_task`, `id_tag`) VALUES (?, ?)"
    db.query(insertTask, [idTask,idTag],(err, result) => {
        console.log(result)
        res.send(result)
    })
})

app.get('/api/get_tags', (req, res) => {
    const query = "SELECT * FROM `tag`"

    db.query(query,(err, result) => {
        res.send(result)
    })
})

app.get('/api/get_count_of_tasks_in_tag/:id', (req, res) => {
    const id = req.params.id

    const query = "SELECT COUNT(`id_tag`) as count FROM `task_in_tag` INNER JOIN `task` ON `task`.`id_task` = `task_in_tag`.`id_task` WHERE `task_in_tag`.`id_tag` = ? AND `task`.`status` = 0;"
    db.query(query,[id],(err, result) => {
        res.send(result)
    })
})

app.get('/api/get_tag/:id', (req, res) => {
    const id = req.params.id

    const query = "SELECT * FROM `tag` WHERE `id_tag` = ?"
    db.query(query, [id],(err, result) => {
        res.send(result)
    })
})

app.post('/api/add_tag', (req, res) => {
    const tagName = req.body.name
    const color = req.body.color

    const insertTag = "INSERT INTO `tag` (`name`, `color`) VALUES (?, ?)"
    db.query(insertTag, [tagName, color],(err, result) => {
        console.log(result)
        res.send(result)
    })
})

app.listen(3001, () => {
    console.log('running on port 3001')
})
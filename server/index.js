const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')

const bcrypt = require('bcryptjs')
const saltRounds = 10

const cookieParser = require('cookie-parser')
const session = require('express-session')

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3000/login", "http://localhost:3000/register"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
}))
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 1000 * 60 * 60 * 24,
    }
}))

const db = mysql.createPool({
    host: 'my_sql',//'my_sql',
    port: 3306,
    user: 'root',
    password: 'Password',//'Password',
    database: 'task_manager',
})

app.get('/api/search_tasks/:find/:id_user', (req, res) => {
    const idAuthor = req.params.id_user
    let find = req.params.find
    find = '%' + find + '%'
    const selectTasks = "SELECT * FROM `task` WHERE `status` = 0 AND `id_author` = ? AND `name` LIKE ?"
    db.query(selectTasks,[idAuthor, find],(err, result) => {
        res.send(result)
    })
})

app.get('/api/get_tasks/:id_author', (req, res) => {
    const idAuthor = req.params.id_author
    const selectTasks = "SELECT * FROM `task` WHERE `status` = 0 AND `id_author` = ? ORDER BY `id_task` DESC"
    db.query(selectTasks,[idAuthor],(err, result) => {
        //res.send(result)
        res.send(err)
    })
})

app.get('/api/get_done_tasks/:id_author', (req, res) => {
    const idAuthor = req.params.id_author
    const selectTasks = "SELECT * FROM `task` WHERE `status` = 1 AND `id_author` = ? ORDER BY `id_task` DESC"
    db.query(selectTasks,[idAuthor],(err, result) => {
        res.send(result)
    })
})

app.get('/api/get_deleted_tasks/:id_author', (req, res) => {
    const idAuthor = req.params.id_author
    const selectTasks = "SELECT * FROM `task` WHERE `status` = 2 AND `id_author` = ? ORDER BY `id_task` DESC"
    db.query(selectTasks,[idAuthor],(err, result) => {
        res.send(result)
    })
})

app.get('/api/get_today_tasks/:date/:id_author', (req, res) => {
    const date = req.params.date
    const idAuthor = req.params.id_author
    const selectTasks = "SELECT * FROM `task` WHERE `status` = 0 AND `date` = ? AND `id_author` = ? ORDER BY `id_task` DESC"
    db.query(selectTasks,[date, idAuthor],(err, result) => {
        res.send(result)
    })
})

app.get('/api/get_count_of_incoming/:id_author', (req, res) => {
    const idAuthor = req.params.id_author
    const query = "SELECT COUNT(`id_task`) AS countOfIncoming FROM `task` WHERE `status` = 0 AND `id_author` = ?"
    db.query(query,[idAuthor],(err, result) => {
        res.send(result)
    })
})

app.get('/api/get_count_of_today/:date/:id_author', (req, res) => {
    const date = req.params.date
    const idAuthor = req.params.id_author
    const query = "SELECT COUNT(`id_task`) AS countOfToday FROM `task` WHERE `status` = 0 AND `date` = ? AND `id_author` = ?"
    db.query(query,[date,idAuthor],(err, result) => {
        res.send(result)
    })
})

app.get('/api/get_tasks_of_project/:id', (req, res) => {
    const id = req.params.id
    const query = "SELECT * FROM `task` WHERE `id_project` = ? AND `status` = 0"
    db.query(query,[id],(err, result) => {
        res.send(result)
    })
})

app.get('/api/get_tasks_of_tag/:id', (req, res) => {
    const id = req.params.id
    const query = "SELECT `task`.* FROM `task` INNER JOIN `task_in_tag` ON `task`.`id_task` = `task_in_tag`.`id_task` WHERE `task_in_tag`.`id_tag` = ? AND `status` = 0"
    db.query(query,[id],(err, result) => {
        res.send(result)
    })
})

app.get('/api/get_tasks_with_tags/:id_author', (req, res) => {
    const idAuthor = req.params.id_author
    const query = "SELECT `task`.`id_task`, `tag`.* FROM `task` INNER JOIN `task_in_tag` ON `task`.`id_task` = `task_in_tag`.`id_task` INNER JOIN `tag` ON `task_in_tag`.`id_tag` = `tag`.`id_tag` WHERE `status` = 0 AND `id_author` = ?"
    db.query(query,[idAuthor],(err, result) => {
        res.send(result)
    })
})

app.delete('/api/delete_tasks/:id_author', (req, res) => {
    const idAuthor = req.params.id_author
    const query = "DELETE FROM `task` WHERE `status` = 2 AND `id_author` = ?"
    db.query(query,[idAuthor],(err, result) => {
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

    const updateTask = "UPDATE `task` SET `status`= ? WHERE `id_task`=?"
    db.query(updateTask, [status, idTask],(err, result) => {
        console.log(result)
        res.send(result)
    })
})

app.put('/api/update_task_priority/:id_task', (req, res) => {
    const idTask = req.params.id_task
    const priority = req.body.priority

    const updateTask = "UPDATE `task` SET `priority`= ? WHERE `id_task`=?"
    db.query(updateTask, [priority, idTask],(err, result) => {
        console.log(result)
        res.send(result)
    })
})

app.put('/api/update_task_description/:id_task', (req, res) => {
    const idTask = req.params.id_task
    const description = req.body.description

    const updateTask = "UPDATE `task` SET `description`= ? WHERE `id_task`=?"
    db.query(updateTask, [description, idTask],(err, result) => {
        console.log(result)
        res.send(result)
    })
})

app.put('/api/update_task_project/:id_task', (req, res) => {
    const idTask = req.params.id_task
    const idProject = req.body.id_project

    const updateTask = "UPDATE `task` SET `id_project`= ? WHERE `id_task`=?"
    db.query(updateTask, [idProject, idTask],(err, result) => {
        console.log(result)
        res.send(result)
    })
})

app.put('/api/update_task_name/:id_task', (req, res) => {
    const idTask = req.params.id_task
    const taskName = req.body.name

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

app.get('/api/get_project_name/:id', (req, res) => {
    const id = req.params.id
    const selectProject = "SELECT `name` FROM `project` WHERE `id_project` = ?"
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

app.get('/api/get_projects/:id_user', (req, res) => {
    const idAuthor = req.params.id_user
    const query = "SELECT `project`.* FROM `project` INNER JOIN `user_in_project` ON `project`.`id_project` = `user_in_project`.`id_project` WHERE `id_user` = ?"
    db.query(query,[idAuthor],(err, result) => {
        res.send(result)
    })
})

app.post('/api/add_project', (req, res) => {
    const projectName = req.body.name
    const color = req.body.color
    
    const insertTask = "INSERT INTO `project` (`name`, `color`) VALUES (?, ?)"
    db.query(insertTask, [projectName, color],(err, result) => {
        res.send(result)
    })
})

app.post('/api/add_user_in_project', (req, res) => {
    const idUser = req.body.id_user
    const idProject = req.body.id_project
    
    const insertTask = "INSERT INTO `user_in_project` (`id_user`, `id_project`) VALUES (?, ?)"
    db.query(insertTask, [idUser, idProject],(err, result) => {
        res.send(result)
    })
})

app.put('/api/update_project', (req, res) => {
    const idProject = req.body.id_project
    const name = req.body.name
    const color = req.body.color

    const updateTask = "UPDATE `project` SET `name`= ?, `color` = ? WHERE `id_project`=?"
    db.query(updateTask, [name, color, idProject],(err, result) => {
        res.send(result)
    })
})

app.delete('/api/delete_project/:id', (req, res) => {
    const id = req.params.id
    const query = "DELETE FROM `project` WHERE `id_project` = ?"
    db.query(query,[id],(err, result) => {
        res.send(result)
    })
})

app.post('/api/add_tag_to_task', (req, res) => {
    const idTask = req.body.id_task
    const idTag = req.body.id_tag

    const insertTask = "INSERT INTO `task_in_tag` (`id_task`, `id_tag`) VALUES (?, ?)"
    db.query(insertTask, [idTask,idTag],(err, result) => {
        res.send(result)
    })
})

app.delete('/api/delete_tag_from_task/:id_task/:id_tag', (req, res) => {
    const idTask = req.params.id_task
    const idTag = req.params.id_tag

    const query = "DELETE FROM `task_in_tag` WHERE `id_task` = ? AND `id_tag` = ?"
    db.query(query, [idTask,idTag],(err, result) => {
        res.send(result)
    })
})

app.get('/api/get_tags/:id_user', (req, res) => {
    const idUser = req.params.id_user
    const query = "SELECT `tag`.* FROM `tag` INNER JOIN `user_in_tag` ON `tag`.`id_tag` = `user_in_tag`.`id_tag` WHERE `id_user` = ?"
    db.query(query,[idUser],(err, result) => {
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

app.get('/api/get_tag_name/:id', (req, res) => {
    const id = req.params.id
    const selectProject = "SELECT `name` FROM `tag` WHERE `id_tag` = ?"
    db.query(selectProject, [id],(err, result) => {
        res.send(result)
    })
})

app.post('/api/add_tag', (req, res) => {
    const tagName = req.body.name
    const color = req.body.color

    const insertTag = "INSERT INTO `tag` (`name`, `color`) VALUES (?, ?)"
    db.query(insertTag, [tagName, color],(err, result) => {
        res.send(result)
    })
})

app.post('/api/add_user_in_tag', (req, res) => {
    const idUser = req.body.id_user
    const idTag = req.body.id_tag
    const insertTask = "INSERT INTO `user_in_tag` (`id_user`, `id_tag`) VALUES (?, ?)"
    db.query(insertTask, [idUser, idTag],(err, result) => {
        res.send(result)
    })
})

app.put('/api/update_tag', (req, res) => {
    const idTag = req.body.id_tag
    const name = req.body.name
    const color = req.body.color

    const updateTask = "UPDATE `tag` SET `name`= ?, `color` = ? WHERE `id_tag`=?"
    db.query(updateTask, [name, color, idTag],(err, result) => {
        res.send(result)
    })
})

app.delete('/api/delete_tag/:id', (req, res) => {
    const id = req.params.id
    const query = "DELETE FROM `tag` WHERE `id_tag` = ?"
    db.query(query,[id],(err, result) => {
        res.send(result)
    })
})

app.post('/api/register', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err)
        }
        const insertTask = "INSERT INTO `user` (`email`, `password`) VALUES (?, ?)"
        db.query(insertTask, [email,hash],(err, result) => {
            console.log(result)
            res.send(result)
        })
    })
})

app.get('/api/login', (req, res) => {
    if (req.session.userId) {
        res.send({ loggedIn: true, user: req.session.userId })
    } else {
        res.send({loggedIn: false})
    }
})

app.post('/api/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const selectProject = "SELECT * FROM `user` WHERE `email` = ?"
    db.query(selectProject, [email],(err, result) => {
        console.log("error: ", err)
        console.log("result from login: ", result)
        if (result.length > 0) {
            bcrypt.compare(password, Buffer.from(result[0].password,'binary').toString(), (error, response) => {
                if (response) {
                    req.session.userId = result
                    console.log("session: ", req.session.userId)
                    res.send(result)
                } else {
                    res.send({message: "Wrong email/password combination"})
                }
            })
        } else {
            res.send({message: "Email not found"})
        }
    })
})

app.post('/api/check_password/:id_user', (req, res) => {
    const idUser = req.params.id_user
    const password = req.body.password
    const selectProject = "SELECT `password` FROM `user` WHERE `id_user` = ?"
    db.query(selectProject, [idUser],(err, result) => {
        if (result.length > 0) {
            bcrypt.compare(password, Buffer.from(result[0].password,'binary').toString(), (error, response) => {
                if (response) {
                    res.send(result)
                } else {
                    res.send({message: "Wrong email/password combination"})
                }
            })
        }
    })
})

app.get('/api/get_user_by_email/:email', (req, res) => {
    const email = req.params.email
    const selectProject = "SELECT `id_user` FROM `user` WHERE `email` = ?"
    db.query(selectProject, [email],(err, result) => {
        res.send(result)
    })
})

app.put('/api/change_email/:id_user', (req, res) => {
    const idUser = req.params.id_user
    const email = req.body.email

    const updateTask = "UPDATE `user` SET `email`= ? WHERE `id_user`=?"
    db.query(updateTask, [email, idUser],(err, result) => {
        console.log(result)
        res.send(result)
    })
})

app.listen(3001, () => {
    console.log('running on port 3001')
})
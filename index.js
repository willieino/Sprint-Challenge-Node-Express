const express = require('express');
const cors = require('cors');
const db = require('./data/dbConfig');
const parser = express.json();
const server = express();
const PORT = 5050;
const logger = require('morgan');
const helmet = require('helmet');
const actions = require('./data/helpers/actionModel')
const projects = require('./data/helpers/projectModel')
//const userRouter = require('./routers/userRouter.js');
//const postRouter = require('./routers/postRouter.js');
//const tagRouter = require('./routers/tagRouter.js');
//const customMW = require('./customMiddleware');

server.use(express.json());
server.use(cors({}));
server.use(parser);
server.use(logger('tiny'));
server.use(helmet());
//server.use('/api/users', userRouter);
//server.use('/api/posts', postRouter);
//server.use('/api/tags', tagRouter);
//server.use(customMW.upperCase);


const sendUserError = (msg, res) => {
    res.status(400);
    res.json({ Error: msg });
    return;
};

// add your server code starting here


/********* Get Projects *************/

server.get('/api/projects', (req, res) => {
    projects.get()
        .then((projects) => {
            res.json(projects);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The projects information could not be retrieved." });
        });
});

/********* Get Single Projectost *************/
server.get('/api/projects/:id', (req, res) => {
    const { id } = req.params
    projects.get(id)
        .then(project => {
            if (project) {
                res.json(project);
            } else {
                res
                    .status(404)
                    .json({ message: "The project with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The project information could not be retrieved." });
        });
});


/************* Delete Post *************/
server.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params
    const foundProject = projects.find(project => project.id == id);
    if (foundProject) {
        projects.remove(id)
            .then(project => {
                if (project) {
                    res.json({ message: "The project was successfully deleted" });
                } else {
                    res
                        .status(404)
                        .json({ message: "The project with the specified ID does not exist." })
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ error: "The project could not be removed." });
            });
    }
});

/********* Update Post *************/
server.put('/api/projects/:id', (req, res) => {
    const { id } = req.params
    const newProject = req.body

    if (!newProject.name || !newProject.description || !newProject.completed) {
        res
            .status(400)
            .json({ message: "Please provide name, description and completed for the project." });
    } else {
        const project = projects.findById(id)
        if (project) {
            projects.update(id, newProject)
                .then(project => {
                    if (project) {
                        projects.findById(id);
                        if (project) {
                            res
                                .status(201)
                                .json(project);
                        } else {
                            res
                                .status(404)
                                .json({ message: "The project with the specified ID does not exist." })
                        }
                    } else {
                        // nothing here
                    }
                })
                .catch(err => {
                    res
                        .status(500)
                        .json({ error: "The project could not be modified." });
                });
        } else {

            res
                .status(404)
                .json({ message: "The project with the specified ID does not exist." })
        }
    }
})

/********* Create New Project *************/
server.post('/api/projects', (req, res) => {
    const project = req.body;
    if (project.name && project.description && project.completed) {
        projects.insert(project)
            .then(project => {
                res.status(201)
                    .json(project)
            })
                .catch (err => {
            res
                .status(500)
                .json({ message: "failed to insert project in db" })
        });
        } else {
    res
        .status(400)
        .json({ message: "missing name, description or completed status." })
}
    });





server.listen(PORT, () => {
    console.log(`server is running on port ${PORT} `);
});


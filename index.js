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

/************************************ PROJECTS SECTION ***********************************/

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

/********* Get Single Project *************/
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


/************* Delete Project *************/
server.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params

    if (id) {
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

/********* Update Project *************/
server.put('/api/projects/:id', (req, res) => {
    const { id } = req.params
    const newProject = req.body

    if (!newProject.name || !newProject.description || !newProject.completed) {
        res
            .status(400)
            .json({ message: "Please provide name, description and completed for the project." });
    } else {
       
        if (newProject) {
            projects.update(id, newProject)
                .then(project => {
                   
                        
                        if (project) {
                            res
                                .status(201)
                                .json(project);
                        } else {
                            res
                                .status(404)
                                .json({ message: "The project with the specified ID does not exist." })
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
            .catch(err => {
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

/************* Get Single Project's Actions *************/
server.get('api/projects/actions/:id', (req, res) => {
    const { id } = req.params;
    users
        .getProjectActions(id)
        .then(usersActions => {
            if (usersActions === 0) {
                return sendUserError(404, 'No actions in the project', res);
            }
            res.json(usersActions);
        })
        .catch(err => {
            return sendUserError(500, 'Unable to access db', res);
        });
});

/***************************************** ACTIONS SECTION **************************************/


/********* Get Actions *************/
server.get('/api/actions', (req, res) => {
    actions.get()
        .then((actions) => {
            res.json(actions);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The actions information could not be retrieved." });
        });
});

/********* Get Single Action *************/
server.get('/api/actions/:id', (req, res) => {
    const { id } = req.params
    actions.get(id)
        .then(action => {
            if (action) {
                res.json(action);
            } else {
                res
                    .status(404)
                    .json({ message: "The actions with the specified ID dont exist." })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The actions could not be retrieved." });
        });
});


/************* Delete Action *************/
server.delete('/api/actions/:id', (req, res) => {
    const { id } = req.params
   
    if (id) {
        actions.remove(id)
            .then(action => {
                if (action) {
                    res.json({ message: "The action was successfully deleted" });
                } else {
                    res
                        .status(404)
                        .json({ message: "The action with the specified ID does not exist." })
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ error: "The action could not be removed." });
            });
    }
});

/********* Update Action *************/
server.put('/api/actions/:id', (req, res) => {
    const { id } = req.params
    const newAction = req.body

    if (!newAction.project_id || !newAction.description || !newAction.notes || !newAction.completed) {
        res
            .status(400)
            .json({ message: "Please provide project id, description, notes and completion status for the action." });
    } else {
        
        if (newAction) {
            actions.update(id, newAction)
                .then(action => {
                    if (action) {
                       
                     
                            res
                                .status(201)
                                .json(action);
                        } else {
                            res
                                .status(404)
                                .json({ message: "The action with the specified ID does not exist." })
                        }
                  
                })
                .catch(err => {
                    res
                        .status(500)
                        .json({ error: "The action could not be modified." });
                });
        } else {

            res
                .status(404)
                .json({ message: "The action with the specified ID does not exist." })
        }
    }
})

/********* Create New Action *************/
server.post('/api/actions', (req, res) => {
    const action = req.body;
    console.log("action:", action)
    if (action.project_id && action.description && action.notes && action.completed) {
        actions.insert(action)
            .then(action => {
                res.status(201)
                    .json(action)
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ message: "failed to insert action in db" })
            });
    } else {
        res
            .status(400)
            .json({ message: "missing project_id, description, notes or completion status." })
    }
});




server.listen(PORT, () => {
    console.log(`server is running on port ${PORT} `);
});


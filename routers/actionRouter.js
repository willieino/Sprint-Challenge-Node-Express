const express = require('express');
const router = express.Router();
const actions = require('../data/helpers/actionModel');

const sendUserError = (status, msg, res) => {
    res
        .status(status)
        .json({ Error: msg });
};

/***************************************** ACTIONS SECTION **************************************/


/********* Get Actions *************/
router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.post('/', (req, res) => {
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




module.exports = router;
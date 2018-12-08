const express = require('express');
const cors = require('cors');
const db = require('./data/dbConfig');
const parser = express.json();
const server = express();
const PORT = 5050;
const logger = require('morgan');
const helmet = require('helmet');
const projectRouter = require('./routers/projectRouter');
const actionRouter = require('./routers/actionRouter')
//const actions = require('./data/helpers/actionModel')
//const projects = require('./data/helpers/projectModel')

server.use(express.json());
server.use(cors({}));
server.use(parser);
server.use(logger('tiny'));
server.use(helmet());
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);


const sendUserError = (msg, res) => {
    res.status(400);
    res.json({ Error: msg });
    return;
};

// add your server code starting here





server.listen(PORT, () => {
    console.log(`server is running on port ${PORT} `);
});


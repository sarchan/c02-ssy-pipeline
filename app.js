const express = require('express');
const logger = require('morgan');

// Generic application setup
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Load routes into variables
const index = require('./routes/index');
const queue = require('./routes/queue') //sagt wo im Projekt die datei liegt
const bytecounter = require('./routes/bytecounter')
const pubsub = require('./routes/pubsub')

// Routes
app.use('/', index);
app.use('/queue', queue) //das ist die url für den browser
app.use('/bytecounter', bytecounter)
app.use('/pubsub', pubsub) //dafür leiten wir queueLogs.js von queue auf pubsub um

module.exports = app;

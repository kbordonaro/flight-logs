const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const validator = require('express-ajv-swagger-validation');

const postLogs = require('./api/postLogs');
const getGenerations = require('./api/getGenerations');
const findGeneration = require('./api/findGeneration');
const findDateRange = require('./api/findDateRange');
const findDuration = require('./api/findDuration');
const findArea = require('./api/findArea');

// URL to the database
const dbRoute = 'mongodb+srv://dbadmin:@kabordonaro-cc9jp.gcp.mongodb.net/shield?retryWrites=true';

// Connect to the database
mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// Output an error connecting to the database.
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    
validator.init(path.join(__dirname, 'api/api.yaml')).then(() => {
    const app = express();
    const router = express.Router();
    
    // Direct root path to the production code
    app.use(express.static('dist'));

    // Hookup the logging and body parsing middleware.
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(logger('dev'));
    
    //
    // Define the API
    //
    router.post('/logs', validator.validate, postLogs);
    router.get('/generations', validator.validate, getGenerations);
    router.get('/find/generation', validator.validate, findGeneration);
    router.get('/find/dates', validator.validate, findDateRange);
    router.get('/find/duration', validator.validate, findDuration);
    router.get('/find/area', validator.validate, findArea);

    // append /api for our http requests
    app.use('/api', router);
    
    // Handle errors
    app.use(function (err, req, res, next) {
        if (err instanceof validator.InputValidationError) {
            console.error(err.errors);
            res.status(400).json({ more_info: JSON.stringify(err.errors) });
        }
    });

    // Attach the api to the port
    app.listen(8080, () => console.log('Listening on port 8080!'));    
});

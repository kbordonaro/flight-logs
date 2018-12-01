const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const validator = require('express-ajv-swagger-validation');

const postLogs = require('./api/postLogs');

// URL to the database
const dbRoute = 'mongodb+srv://dbadmin:GHQzRClBsvIEglUx@kabordonaro-cc9jp.gcp.mongodb.net/shield?retryWrites=true';

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
    
    // Handle errors
    app.use(function (err, req, res, next) {
        if (err instanceof validator.InputValidationError) {
            res.status(400).json({ more_info: JSON.stringify(err.errors) });
        }
    });

    //
    // Define the API
    //
    router.post('/logs', validator.validate, postLogs);
    
    // append /api for our http requests
    app.use('/api', router);
    
    // Attach the api to the port
    app.listen(8080, () => console.log('Listening on port 8080!'));    
});

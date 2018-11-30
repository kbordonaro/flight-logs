const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const LogModel = require("./LogModel");

const app = express();
const router = express.Router();

// Direct root path to the production code
app.use(express.static('dist'));

// URL to the database
const dbRoute = "mongodb+srv://dbadmin:GHQzRClBsvIEglUx@kabordonaro-cc9jp.gcp.mongodb.net/shield?retryWrites=true";

// Connect to the database
mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// Output an error connecting to the database.
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Hookup the logging and body parsing middleware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

//
// Define the API
//

router.get('/getUsername', (req, res) => {
    LogModel.find((err, data) => {
        console.log("Error", err);
        console.log(data);
    });
    res.send({ username: 'test' });
});

// append /api for our http requests
app.use("/api", router);

// Attach the api to the port
app.listen(8080, () => console.log('Listening on port 8080!'));

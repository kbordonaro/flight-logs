const LogModel = require('./LogModel');

// Post the API Handler.
module.exports = (req, res) => {
  console.log(req.body);

  res.status(204).send();
}
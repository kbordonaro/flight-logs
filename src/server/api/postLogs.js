const LogModel = require('./LogModel');

// Post the API Handler.
module.exports = (req, res) => {
  LogModel.insertMany(req.body, (error) => {
    if(error) {
      return res.status(500).send({
        error
      });
    }
  });

  res.status(204).send();
}
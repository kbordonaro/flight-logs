const LogModel = require('./LogModel');

// Post the API Handler.
module.exports = (req, res) => {
  LogModel.find({generation: req.query.generation}, (error, values) => {
    if(error) {
      return res.status(500).send({
        error
      });
    }

    res.status(200).send(values);
  });
}
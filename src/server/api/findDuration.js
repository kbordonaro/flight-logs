const LogModel = require('./LogModel');

// Post the API Handler.
module.exports = (req, res) => {
  // Convert the duration in minutes to milliseconds.
  const filter = {
    duration: {
      '$lte': (req.query.duration * 60000),
    }
  };

  LogModel.find(filter, (error, values) => {
    if(error) {
      return res.status(500).send({
        error
      });
    }

    res.status(200).send(values);
  });
}
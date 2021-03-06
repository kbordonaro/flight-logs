const LogModel = require('./LogModel');

// Post the API Handler.
module.exports = (req, res) => {
  const filter = {};
  if(req.query.startDate) {
    filter.startDate = {
      '$gte': req.query.startDate,
    }
  }
  if(req.query.endDate) {
    filter.endDate = {
      '$lte': req.query.endDate,
    }
  }

  LogModel.find(filter, (error, values) => {
    if(error) {
      return res.status(500).send({
        error
      });
    }

    res.status(200).send(values);
  });
}
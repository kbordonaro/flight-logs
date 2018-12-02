const LogModel = require('./LogModel');

// Post the API Handler.
module.exports = (req, res) => {
  // Add the duration of the flight
  const records = req.body.map((record) => {
    return {
      ...record,
      duration: (
        new Date(record.endDate).getTime() -
        new Date(record.startDate).getTime()
      ),
    }
  });

  LogModel.insertMany(records, (error) => {
    if(error) {
      return res.status(500).send({
        error
      });
    }
  });

  res.status(204).send();
}
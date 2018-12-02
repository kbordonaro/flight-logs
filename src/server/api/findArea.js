const LogModel = require('./LogModel');

// Post the API Handler.
module.exports = (req, res) => {
  const filter = {
    location: {
      $geoWithin: {
        $box: [
          [req.query.left, req.query.bottom],
          [req.query.right, req.query.top],
        ]
      }
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
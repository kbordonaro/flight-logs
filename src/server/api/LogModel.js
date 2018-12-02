const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the data schema
const DataSchema = new Schema(
  {
    drone: Number,
    generation: Number,
    startDate: Date,
    endDate: Date,
    latitude: Number,
    longitude: Number,
    imagePath: String,
    duration: Number,
  },{
    timestamps: true,
  }
);

// Export the data model.
module.exports = mongoose.model('Logs', DataSchema, 'logs');
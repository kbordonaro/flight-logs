const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the data schema
const DataSchema = new Schema(
  {
    id: Number,
    generation: Number
  },
  { timestamps: true }
);

// Export the data model.
module.exports = mongoose.model("Logs", DataSchema, "logs");
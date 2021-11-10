const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let selectionSchema = new Schema({
    letterGrade: {
      type: String
    },
    pointMin: {
      type: Number
    },
    pointMax: {
      type: Number,
    }
  }, {
    collection: 'selection'
});

module.exports = mongoose.model('selection', selectionSchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let gradeSchema = new Schema({
    enrollment: {
      type: Number
    },
    course: {
      type: String,
    }
  }, {
    collection: 'enrollment'
});

module.exports = mongoose.model('enrollment', gradeSchema)

//versionKey: false 
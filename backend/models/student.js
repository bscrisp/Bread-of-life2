
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let studentSchema = new Schema({
    firstName: {
      type: String
    },
    lastName: {
        type: String
    },
    email: {
      type: String
    },
    major: {
      type: String
    },
    phoneNumber: {
      type: String
    },
    studentID: {
      type: Number,
      required: true,
      unique: true
    }
  }, {
    collection: 'students'
});

module.exports = mongoose.model('student', studentSchema)

//versionKey: false 




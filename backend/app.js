const express = require("express");
const mongoose = require("mongoose");  // Require mongoose library
const cors = require('cors');
//Adding better logging functionality
const morgan = require("morgan");
//In the production systems, we should not hardcode the sensitive data like API Keys, 
//Secret Tokens, etc directly within the codebase (based on the Twelve factor App method). 
// We will pass them as environment variables. This module helps us to load environment variables from a .env file into process.env
require("dotenv").config();   // Require the dotenv

const app = express();  //Create new instance


// import the student model schema from another file
let StudentModel = require('./models/student');

// grades model
let GradeModel = require('./models/grade');

// selection model
let SelectionModel = require('./models/selection');

// enrollment model
let EnrollmentModel = require('./models/enrollment');

// setting up mongoose DB connection
mongoose
  .connect(process.env.MONGO_URL)   // read environment varibale from .env
  .then(() => {
    console.log("Database connection Success!");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

const PORT = process.env.PORT || 3000; //Declare the port number

app.use(cors());
app.use(express.json()); //allows us to access request body as req.body
app.use(morgan("dev"));  //enable incoming request logging in dev mode
 
//create an endpoint to get all students from the API
app.get('/students', (req, res, next) => {
    //very plain way to get all the data from the collection through the mongoose schema
    StudentModel.find((error, data) => {
        if (error) {
          //here we are using a call to next() to send an error message back
          return next(error)
        } else {
          res.json(data)
        }
      })
});

//delete a student by id
app.delete('/student/:id', (req, res, next) => {
    //mongoose will use studentID of document
    StudentModel.findOneAndRemove({ _id: req.params.id}, (error, data) => {
        if (error) {
          return next(error);
        } else {
           res.status(200).json({
             msg: data
           });
        //  res.send('Student is deleted');
        }
      });
});

// endpoint that will create a student document
app.post('/student', (req, res, next) => {

    StudentModel.create(req.body, (error, data) => {
        if (error) {
          return next(error)
        } else {
          // res.json(data)
          res.send('Student is added to the database');
        }
    });
});

// endpoint for retrieving student by studentID
app.get('/students/:studentId', (req, res, next) => {
    StudentModel.findOne({ studentID: req.params.studentId}, (error, data) => {
        if (error) {
            return next(error)
        } else if (data === null) {
            // Sending 404 when not found something is a good practice
          res.status(404).send('Student not found');
        }
        else {
          res.json(data)
        }
    });
});

// endpoint for retrieving student by _id
app.get('/student/:id', (req, res, next) => {
  StudentModel.findOne({ _id: req.params.id}, (error, data) => {
      if (error) {
          return next(error)
      } else if (data === null) {
          // Sending 404 when not found something is a good practice
        res.status(404).send('Student not found');
      }
      else {
        res.json(data)
      }
  });
});

// Updating - editing a student - we want to use PUT
app.put('/student/:id', (req, res, next) => {
    StudentModel.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
      }, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.send('Student is edited via PUT');
          console.log('Student successfully updated!', data)
        }
      })
});

// endpoint that will create a grade document
app.post('/grade', (req, res, next) => {
    GradeModel.create(req.body, (error, data) => {
        if (error) {
          return next(error)
        } else {
          // res.json(data)
          res.send('Grade has been added to the database');
        }
    });
});

// endpoint that will update a grade document
app.put('/grade/:id', (req, res, next) => {
  console.log(req.body)
  GradeModel.findOneAndUpdate({ _id: req.params.id }, {
    $set: req.body
  }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        // res.json(data)
        res.send('Grade has been added to the database');
      }
  });
});

//delete a grade by id
app.delete('/grade/:id', (req, res, next) => {
  //mongoose will use _id of document
  GradeModel.findOneAndRemove({ _id: req.params.id}, (error, data) => {
      if (error) {
        return next(error);
      } else {
         res.status(200).json({
           msg: data
         });
      }
    });
});

// endpoint that will retrieve grades by grade _id
app.get('/grade/:id', (req, res, next) => {
  GradeModel.findOne({ _id: req.params.id }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data);
      }
  });
});

// endpoint that will retrieve grades by student ID
app.get('/student-grade/:id', (req, res, next) => {
    GradeModel.find({ studentID: req.params.id }, (error, data) => {
        if (error) {
          return next(error)
        } else {
          console.log(data)
          res.json(data);
        }
    });
});

// endpoint that will retrieve grades by first Name
app.get('/student-grade2/:firstName', (req, res, next) => {


  StudentModel.aggregate([
    { $match : { firstName : req.params.firstName } },
    { $project : { _id : 0, email : 1, phoneNumber : 1, studentID : 1 } },
    { $lookup : {
        from : 'grades',
        localField : 'studentID',
        foreignField : 'studentID',
        as : 'grades'
    } }
  ], (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data);
      }
  });
});

// endpoint that will retrieve selections for grades
app.get('/selections', (req, res, next) => {
  SelectionModel.find({  }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data);
      }
  });
});

// endpoint that will retrieve data for barchart
app.get('/enrollment', (req, res, next) => {
  EnrollmentModel.find({  }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data);
      }
  });
});


app.listen(PORT, () => {
  console.log("Server started listening on port : ", PORT);
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) 
        err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
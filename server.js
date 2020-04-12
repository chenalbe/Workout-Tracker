const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");
const path = require("path");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;
const Workout = require("./models/workout.js");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

//get workout records from DB
app.get("/api/workouts", (req, res)=>{
  Workout.find({}).then(data =>{
    res.json(data);
  });
});

// create workout plan
app.post("/api/workouts", (req, res)=>{
  Workout.create(req.body)
  .then(Workout=>{
    res.json(Workout);
  })
  .catch(err =>{
    res.status(400).json(err);
  });
});

// route for exercise.html
app.get("/exercise", (req, res) =>{
  res.sendFile(path.join(__dirname, "./public/exercise.html"))
});
// route for stats.html
app.get("/stats", (req, res) =>{
  res.sendFile(path.join(__dirname, "./public/stats.html"))
});

// route for the index.html
app.get("/", function(req,res){
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

//retreive workout plans for stats
app.get("/api/workouts/range", (req, res)=>{
  Workout.find({}).then(data=>{
    res.json(data);
  });
});

//get all data
app.get("/all", (req, res) => {
  Workout.find({}, (err, data)=>{
    if (err) {
      throw err;
    } else {
      res.json(data);
    };
  });
});

//add exercie to the workout plan
app.put("/api/workouts/:id", (req, res)=>{
  Workout.findByIdAndUpdate(
    {
      _id:mongojs.ObjectId(req.params.id)},
      {$push:{exercises:req.body}}, 
      {new:true})
      .then(data=>{
        res.json(data);
      })
      .catch(err=>{
        res.status(400).json(err);
      });
});
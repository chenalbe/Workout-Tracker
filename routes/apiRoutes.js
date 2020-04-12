const router = require("express").Router();
const db = require("../models/workout.js");

//get workout records from DB
router.get("/api/workouts", (req, res) => {
    db.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
      })
    .catch(err => {
      res.json(err);
      console.log(err);
      });
  });
  
  // create workout plan
  router.post("/api/workouts", (req, res)=>{
    db.create({})
    .then(dbWorkout=>{
      res.json(dbWorkout);
    })
    .catch(err =>{
      res.json(err);
      console.log(err);
    });
  });
  
  
  
  //retreive workout plans for stats
  router.get("/api/workouts/range", (req, res)=>{
    db.find({}).then(dbWorkout=>{
      res.json(dbWorkout);
    })
    .catch(err=>{
      res.json(err);
      console.log(err);
    })
  });
  
  //add exercie to the workout plan
  router.put("/api/workouts/:id", ({body, params}, res)=>{
    db.findByIdAndUpdate(
        params.id,
        {$push:{exercises:body}}, 
        {new:true})
        .then(dbWorkout=>{
          res.json(dbWorkout);
        })
        .catch(err=>{
          res.json(err);
          console.log(err);
        });
  });

  module.exports = router;

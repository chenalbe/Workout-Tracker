const router = require("express").Router();
const db = require("../models");

//get workout records from DB
router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .then(data => {
      res.json(data);
      })
    .catch(err => {
              res.json(err);
          });
  });
  
  // create workout plan
  router.post("/api/workouts", (req, res)=>{
    db.Workout.create({})
    .then(data=>{
      res.json(data);
    })
    .catch(err =>{
      res.status(400).json(err);
    });
  });
  
  
  
  //retreive workout plans for stats
  router.get("/api/workouts/range", (req, res)=>{
    db.Workout.find({}).then(data=>{
      res.json(data);
    })
    .catch(err=>{
      res.json(err);
    })
  });
  
  //add exercie to the workout plan
  router.put("/api/workouts/:id", (req, res)=>{
    db.Workout.findByIdAndUpdate(
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

  module.exports = router;

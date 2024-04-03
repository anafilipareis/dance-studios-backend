const router = require("express").Router();
const mongoose = require("mongoose");


const express = require('express');
const DanceClass = require('../models/DanceClass.model');
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { isTeacher } = require("../middleware/jwt.isTeacher");
const fileUploader = require('../config/cloudinary.config');
const app = express();


// GET /dance-classes/ - all of the classes from every teacher
router.get("/", (req, res) => {
    DanceClass.find({})
    .populate('teacher')
      .then((allDanceClasses) => {
        res.json(allDanceClasses);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  });

// GET /dance-classes/class/{id}: only the classes from the teacher who logged in (ask Ana if she is okay to keep the this)
  router.get("/class/:id" , isAuthenticated, (req, res) => {
    const danceClassId = req.params.id;

    DanceClass.findById(danceClassId)
    .populate('teacher')
    .populate({
      path: 'comments',
      populate: { path: 'user' }
  })
 
    .then((danceClass) => {
        if (!danceClass) {
            return res.status(404).json({ error: 'Sorry, we did not find the class.' });
        }
        console.log(danceClass)
        res.json(danceClass);
     })
     .catch((err) => {
        res.status(400).json({ error: err.message });
     });

  });

// POST /dance-classes/class/create 
router.post("/class/create", isAuthenticated, isTeacher, (req, res, next) => {
    const { title, day, time, description, video, pictures } = req.body;
    const teacher = req.payload._id;

    DanceClass.create({title, teacher, day, time, description, video, pictures, favorites:[], comments:[]})
    .then(danceClass => res.json(danceClass))
    .catch(err => res.status(400).json({ error: err.message }));
});

// GET /dance-classes/teacher
router.get("/teacher", isAuthenticated, isTeacher, (req, res) => {
  const teacherId = req.payload._id; 
  
  DanceClass.find({ teacher: teacherId })
      .then((teacherDanceClasses) => {
          res.json(teacherDanceClasses);
      })
      .catch((err) => {
          res.status(400).json({ error: err.message });
      });
});

// PUT dance-classes/class/:id - 
router.put("/class/:id", isAuthenticated, isTeacher, (req, res) => {
    const danceClassId = req.params.id;
    const { title, day, time, description, video, pictures } = req.body;
    
  
    
    DanceClass.findByIdAndUpdate(
      danceClassId,
      { title, day, time, description, video, pictures },
      { new: true } 
    )
    .populate({
      path: 'comments',
      populate: { path: 'user' }
  })
      .then(updatedDanceClass => {
        if (!updatedDanceClass) {
          return res.status(404).json({ error: "Dance class not found." });
        }
        res.json(updatedDanceClass); 
      })
      .catch(err => {
        res.status(400).json({ error: err.message }); 
      });
  });

// DELETE dance-classes/class/:id 
router.delete("/class/:id", isAuthenticated, isTeacher, (req, res) => {
    const danceClassId = req.params.id;
  

    DanceClass.findByIdAndDelete(danceClassId)
      .then(deletedDanceClass => {
        if (!deletedDanceClass) {
          return res.status(404).json({ error: "Dance class not found." });
        }
        res.json({ message: "Dance class deleted successfully." });
      })
      .catch(err => {
        res.status(400).json({ error: err.message }); 
      });
  });


module.exports = router;
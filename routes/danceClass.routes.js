const router = require("express").Router();
const mongoose = require("mongoose");
// ********* require fileUploader in order to use it *********
const fileUploader = require('../config/cloudinary.config');
const express = require('express');
const DanceClass = require('../models/DanceClass.model');
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { isTeacher } = require("../middleware/jwt.isTeacher");

const app = express();


// GET /dance-classes/: Retrieve a list of all dance classes.
router.get("/", (req, res) => {
    DanceClass.find({})
      .then((allDanceClasses) => {
        res.json(allDanceClasses);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  });

// GET /dance-classes/class/{id}: Retrieve details of a specific dance class by its ID.
  router.get("/class/:id" , isAuthenticated, (req, res) => {
    const danceClassId = req.params.id;

    DanceClass.findById(danceClassId)
     .then((danceClass) => {
        if (!danceClass) {
            return res.status(404).json({ error: 'Sorry, we did not find the class.' });
        }
        res.json(danceClass);
     })
     .catch((err) => {
        res.status(400).json({ error: err.message });
     });

  });

// POST /dance-classes/class/create : Only teacher can Create a new dance class.
router.post("/class/create", isAuthenticated, isTeacher, (req, res, next) => {
    const { title, day, time, description, video, pictures } = req.body;
    const teacher = req.payload._id;

    DanceClass.create({title, teacher, day, time, description, video, pictures, favorites:[], comments:[]})
    .then(danceClass => res.json(danceClass))
    .catch(err => res.status(400).json({ error: err.message }));
});

// PUT dance-classes/class/:id - Update an existing dance class
router.put("/class/:id", isAuthenticated, isTeacher, (req, res) => {
    const danceClassId = req.params.id;
    const { title, day, time, description, video, pictures } = req.body;
    
  
    // Find the dance class by ID and update the danced class details
    DanceClass.findByIdAndUpdate(
      danceClassId,
      { title, day, time, description, video, pictures },
      { new: true } // Return the updated dance class
    )
      .then(updatedDanceClass => {
        if (!updatedDanceClass) {
          return res.status(404).json({ error: "Dance class not found." });
        }
        res.json(updatedDanceClass); // Return the updated dance class
      })
      .catch(err => {
        res.status(400).json({ error: err.message }); 
      });
  });

// DELETE dance-classes/class/:id - Delete a dance class
router.delete("/class/:id", isAuthenticated, isTeacher, (req, res) => {
    const danceClassId = req.params.id;
  
    // Find the dance class by ID and delete it
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
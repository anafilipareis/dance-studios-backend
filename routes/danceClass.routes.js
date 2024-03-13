// GET /dance-classes: Retrieve a list of all dance classes.
// GET /dance-classes/{id}: Retrieve details of a specific dance class by its ID.
// POST /dance-classes: Create a new dance class.
// PUT /dance-classes/{id}: Update an existing dance class.
// DELETE /dance-classes/{id}: Delete a dance class.
// POST /dance-classes/{id}/comments: Add a comment to a specific dance class.
// POST /dance-classes/{id}/favorites: Add the dance class to the user's favorites.
// GET /users/{userId}/favorites: Retrieve a list of dance classes favorited by a user.





const router = require("express").Router();
const mongoose = require("mongoose");

const express = require('express');
const DanceClass = require('../models/DanceClass.model');
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { isTeacher } = require("../middleware/jwt.isTeacher");

const app = express();


// GET /dance-classes: Retrieve a list of all dance classes.

router.get("/dance-classes", (req, res) => {
    DanceClass.find({})
      .then((allDanceClasses) => {
        res.json(allDanceClasses);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  });

  // GET /dance-classes/{id}: Retrieve details of a specific dance class by its ID.

  router.get("dance-classes/:id" , isAuthenticated, (req, res) => {
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

  // POST /dance-classes: Only teacher can Create a new dance class.

router.post("/create", isAuthenticated, isTeacher, (req, res, next) => {
    const { title, schedule, description, video, pictures } = req.body;
    const teacher = req.payload._id;

    DanceClass.create({title, teacher, schedule, description, video, pictures, favorites:[], comments:[]})
    .then(danceClass => res.json(danceClass))
    .catch(err => res.status(400).json({ error: err.message }));
});

// PUT /dance-classes/:id - Update an existing dance class
router.put("/dance-classes/:id", isAuthenticated, isTeacher, (req, res) => {
    const danceClassId = req.params.id;
    const { title, schedule, description, video, pictures } = req.body;
  
    // Find the dance class by ID and update the danced class details
    DanceClass.findByIdAndUpdate(
      danceClassId,
      { title, schedule, description, video, pictures },
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

  // DELETE /dance-classes/:id - Delete a dance class
router.delete("/dance-classes/:id", isAuthenticated, isTeacher, (req, res) => {
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

 

  router.post("/dance-classes/:id/favorites", isAuthenticated, (req, res) => {
    const danceClassId = req.params.id;
    const userId = req.payload._id;
  
    // Find the user
    User.findById(userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: "User not found." });
        }
  
        // Add the dance class ID to favorites array
        user.favouriteClasses.push(danceClassId);
  
        
        return user.save();
      })
      .then(updatedUser => {
        res.json(updatedUser);
      })
      .catch(err => {
        res.status(400).json({ error: err.message });
      });
  });

  // GET /users/:userId/favorites - Retrieve a list of dance classes saved by a logged in user
router.get("/users/:userId/favorites", isAuthenticated, (req, res) => {
    const userId = req.params.userId;
  
    // Find the user by ID and then we populate their favorite dance classes
    User.findById(userId)
      .populate('favouriteClasses')
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: "User not found." });
        }
        res.json(user.favouriteClasses);
      })
      .catch(err => {
        res.status(400).json({ error: err.message });
      });
  });
  

  module.exports = router;
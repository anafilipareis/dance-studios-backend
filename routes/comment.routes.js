const router = require("express").Router();
const mongoose = require("mongoose");
const DanceClass = require('../models/DanceClass.model');
const Comment = require('../models/Comment.model');
const { isAuthenticated } = require("../middleware/jwt.middleware");


 // POST /comments/class/:id/ - Add a comment to a specific dance class
 router.post("/class/:id", isAuthenticated, (req, res) => {
    const danceClassId = req.params.id;
    const { comment } = req.body;
    const userId = req.payload._id;

    const newComment = {
      danceClass: danceClassId,
      text: comment,
      user: userId,
      likesCount: 0, // Initialize likesCount to 0
    };
  
    Comment.create(newComment).then((createdComment) => {
      console.log(createdComment);
      
      DanceClass.findById(danceClassId)
      .then(danceClass => {
        if (!danceClass) {
          return res.status(404).json({ error: "Dance class not found." });
        }
  
        // Add the comment to the array
        danceClass.comments.push(createdComment._id);
  
        
        return danceClass.save();
      })
      .then(updatedDanceClass => {
        createdComment.populate("user").then((commentPopulated) => {
           res.json(commentPopulated);
        })
       
      })
    })
      .catch(err => {
        res.status(400).json({ error: err.message });
      });
  });


  module.exports = router;
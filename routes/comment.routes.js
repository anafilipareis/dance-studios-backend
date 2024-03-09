const router = require("express").Router();
const mongoose = require("mongoose");
const DanceClass = require('../models/DanceClass.model');
const { isAuthenticated } = require("../middleware/jwt.middleware");

const app = express();

// POST /dance-class/:class/comment
// Create a new comment on a specific class by ID
// Both teachers and students can leave comments and replies
// (Edit and delete comments as a bonus would be very nice)

 // POST /dance-classes/:id/comment - Add a comment to a specific dance class
 router.post("/dance-classes/:id/comment", isAuthenticated, (req, res) => {
    const danceClassId = req.params.id;
    const { comment } = req.body;
    const userId = req.payload._id;
  
    // Find the dance class
    DanceClass.findById(danceClassId)
      .then(danceClass => {
        if (!danceClass) {
          return res.status(404).json({ error: "Dance class not found." });
        }
  
        // new comment with the LikesCount
        const newComment = {
          text: comment,
          user: userId,
          likesCount: 0, // Initialize likesCount to 0
        };

        // If it's a reply, update the parent comment with the new reply
        if (parentCommentId) {
        const parentComment = danceClass.comments.id(parentCommentId);
        if (parentComment) {
          parentComment.replies.push(newComment);
        }
      } else {
        
        // Add the comment to the main comments array
        danceClass.comments.push(newComment);
      }
  
        // Add the comment to the array
        danceClass.comments.push(newComment);
  
        
        return danceClass.save();
      })
      .then(updatedDanceClass => {
        res.json(updatedDanceClass);
      })
      .catch(err => {
        res.status(400).json({ error: err.message });
      });
  });



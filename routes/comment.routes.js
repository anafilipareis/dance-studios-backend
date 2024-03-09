const router = require("express").Router();
const mongoose = require("mongoose");

const express = require('express');
const DanceClass = require('../models/DanceClass.model');
const { isAuthenticated } = require("../middleware/jwt.middleware");

const app = express();

 // POST /dance-classes/:id/comments - Add a comment to a specific dance class
 router.post("/dance-classes/:id/comments", isAuthenticated, (req, res) => {
    const danceClassId = req.params.id;
    const { comment } = req.body;
    const userId = req.payload._id;
  
    // Find the dance class
    DanceClass.findById(danceClassId)
      .then(danceClass => {
        if (!danceClass) {
          return res.status(404).json({ error: "Dance class not found." });
        }
  
        // new comment
        const newComment = {
          text: comment,
          user: userId
        };
  
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


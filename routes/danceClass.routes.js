const router = require("express").Router();
const mongoose = require("mongoose");

const express = require('express');
const DanceClass = require('../models/DanceClass.model');

const app = express();


// Post /api/classes - Create dance classes

router.post("/classes", isAuthenticated, isTeacher, (req, res, next) => {
    const { title, schedule, description, video, pictures } = req.body;
    const teacher = req.payload._id;

    DanceClass.create({title, teacher, schedule, description, video, pictures, favorites:[], comments:[]})
    .then(danceClass => res.json(danceClass))
    .catch(err => res.status(400).json({ error: err.message }));
});


// GET /dance-classes: Retrieve a list of all dance classes.

app.get('')
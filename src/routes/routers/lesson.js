'use strict';

const express = require('express');
const lessonController = require('../../controllers/lessonController');
//const auth = require('../../middlewares/auth')

const router = new express.Router();

//GET /lessons
router.get('/lessons', lessonController.getLessons);

//GET /lessons/:group_id

//POST /lessons
router.post('/lessons', lessonController.createAndGetLesson);



module.exports = router;

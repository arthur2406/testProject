'use strict';

const express = require('express');
const lessonController = require('../../controllers/lessonController');
//const auth = require('../../middlewares/auth')

const router = new express.Router();

//GET /lessons
router.get('/lessons', lessonController.getLessons);

//GET /lessons/:group_id
router.get('/lessons/:id', lessonController.getLessonById);

//POST /lessons
router.post('/lessons', lessonController.createAndGetLesson);

//PATCH /lessons/:id
router.patch('/lessons/:id', lessonController.updateAndGetLesson);

//DELETE /lessons/:id
router.delete('/lessons/:id', lessonController.deleteAndGetLesson);



module.exports = router;

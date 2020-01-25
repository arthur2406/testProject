'use strict';

const { fetchLessons, fetchLessonById, createLesson, updateLesson, deleteLesson } = require('../db/lessonDB');

exports.getLessons = async (req, res) => {
  try {
    const lessons = await fetchLessons();
    res.send(lessons);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getLessonById = async (req, res) => {
  try {
    const lesson = await fetchLessonById(req.params.id);
    if (!lesson) {
      return res.status(404).send();
    }
    res.send(lesson);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createAndGetLesson = async (req, res) => {
  try {
    const createdLesson = await createLesson(req.body);
    res.send(createdLesson);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updateAndGetLesson = async (req, res) => {
  const _id = req.params.id;
  const updatesKeys = Object.keys(req.body);

  //Here we can state update that will be allowed
  const allowedUpdatesKeys = ['name', 'teacher', 'startsAt', 'audience'];
  const isValidOperation = updatesKeys.every(updateKey => allowedUpdatesKeys.includes(updateKey));
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' });
  }
  try {
    const updates = req.body;
    const lesson = await updateLesson(_id, updatesKeys, updates);
    if (!lesson) {
      res.status(404).send();
    }
    res.send(lesson);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteAndGetLesson = async (req, res) => {
  const _id = req.params.id;
  try {
    const lesson = await deleteLesson(_id);
    if (!lesson) {
      return res.status(404).send();
    }
    res.send(lesson);
  } catch (err) {
    res.status(500).send(err);
  }
};





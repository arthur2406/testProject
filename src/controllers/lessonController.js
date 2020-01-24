'use strict';

const { fetchLessons, createLesson } = require('../db/mongoose');

exports.getLessons = async (req, res) => {
  const lessons = await fetchLessons();
  res.send(lessons);
};

exports.createAndGetLesson = async (req, res) => {
  try {
    const createdLesson = await createLesson(req.body);
    res.send(createdLesson);
  } catch (err) {
    res.status(400).send(err);
  }
};




'use strict';

const Lesson = require('../models/lesson');

//CRUD operations for lesson

const fetchLessons =  async () => {
  const lessons = await Lesson.find({});
  for (const lesson of lessons) {
    try {
      await lesson
        .populate({
          path: 'groupOfStudents',
          select: 'name -_id',
        })
        .execPopulate();
    } catch (err) {
      throw new Error(err);
    }
  }
  return lessons;
};

const fetchLessonById = async id => {
  try {
    const lesson = await Lesson.findById(id);
    await lesson
      .populate({
        path: 'groupOfStudents',
        select: 'name -_id',
      })
      .execPopulate();
    return lesson;
  } catch (err) {
    throw new Error(err);
  }
};

const createLesson = async body => {
  const lesson = new Lesson(body);
  try {
    await lesson.save();
    return lesson;
  } catch (err) {
    throw new Error(err);
  }
};

const updateLesson = async (id, updatesKeys, updates) => {
  try {
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return undefined;
    }
    updatesKeys.forEach(updateKey => lesson[updateKey] = updates[updateKey]);
    await lesson.save();
    return lesson;
  } catch (err) {
    throw new Error(err);
  }
};

const deleteLesson = async id => {
  try {
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return undefined;
    }
    await lesson.remove();
    return lesson;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  fetchLessons,
  fetchLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
};

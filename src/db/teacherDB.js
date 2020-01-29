'use strict';

const Teacher = require('../models/teacher');
const Lesson = require('../models/lesson');

const populateWithLessons = async teacher => {
  const lessonsIds = teacher.lessons;
  const lessons = [];
  for (const lessonId of lessonsIds) {
    try {
      const lesson = await Lesson.findById(lessonId);
      lessons.push(lesson);
    } catch (err) {
      throw new Error(err);
    }
  }
  teacher.lessons = lessons;
  return teacher;
};

const findAuthTeacher = async (id, token) => {
  try {
    const teacher = await Teacher.findOne({ _id: id, 'tokens.token': token });
    if (!teacher) {
      return undefined;
    }
    return teacher;
  } catch (err) {
    throw new Error(err);
  }
};

const findTeacherByCredentials = async (email, password) => {
  try {
    const teacher = await Teacher.findByCredentials(email, password);
    return teacher;
  } catch (err) {
    throw new Error(err);
  }
};

const createTeacher = async body => {
  const teacher = new Teacher(body);
  try {
    await teacher.save();
    return teacher;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  findAuthTeacher,
  createTeacher,
  findTeacherByCredentials,
  populateWithLessons,
};

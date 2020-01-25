'use strict';

const Student = require('../models/student');
const Lesson = require('../models/student');

const findAuthStudent = async (id, token) => {
  try {
    const student = await Student.findOne({ _id: id, 'tokens.token': token });
    if (!student) {
      return undefined;
    }
    return student;
  } catch (err) {
    throw new Error(err);
  }
};

const findStudentByCredentials = async (email, password) => {
  try {
    const student = await Student.findByCredentials(email, password);
    //finding all lessons for this group
    const lessons = await Lesson.find({ groupOfStudents: student.group._id });
    student.lessons = lessons;
    return student;
  } catch (err) {
    throw new Error(err);
  }
};

const createStudent = async body => {
  const student = new Student(body);
  try {
    await student.save();
    return student;
  } catch (err) {
    throw new Error(err);
  }
};



module.exports = {
  findAuthStudent,
  findStudentByCredentials,
  createStudent,
};

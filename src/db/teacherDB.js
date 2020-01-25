'use strict';

const Teacher = require('../models/teacher');

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

module.exports = {
  findAuthTeacher,
};
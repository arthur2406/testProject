'use strict';

const {
  createStudent,
  findStudentByCredentials,
} = require('../db/studentDB');


exports.createAndGetStudent = async (req, res) => {
  try {
    const student = await createStudent(req.body);
    const token = await student.generateAuthToken();
    res.status(201).send({ student, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.loginAndGetStudent = async (req, res) => {
  try {
    const student = await findStudentByCredentials(req.body.email, req.body.password);
    const token = await student.generateAuthToken();
    res.send({ student, token });
  } catch (err) {
    res.status(400).send(err);
  }
};
// exports.logoutStudent
// exports.logoutAllStudent
// exports.getStudent
// exports.updateStudent
// exports.deleteStudent
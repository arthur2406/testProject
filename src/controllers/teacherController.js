'use strict';

const {
  createTeacher,
  findTeacherByCredentials,
  populateWithLessons,
} = require('../db/teacherDB');


exports.createAndGetTeacher = async (req, res) => {
  try {
    const teacher = await createTeacher(req.body);
    const token = await teacher.generateAuthToken();
    res.status(201).send({ teacher, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.loginAndGetTeacher = async (req, res) => {
  try {
    const teacher = await findTeacherByCredentials(req.body.email, req.body.password);
    const token = await teacher.generateAuthToken();
    res.send({ teacher, token });
  } catch (err) {
    res.status(400).send({ error: 'Incorrect email or password' });
  }
};


exports.logoutTeacher = async (req, res) => {
  try {
    req.teacher.tokens = req.teacher.tokens.filter(token => token.token !== req.token)
    await req.teacher.save();
    res.send();
  } catch (err) {
    res.status(500).send();
  }
};

exports.logoutAllTeacher = async (req, res) => {
  try {
    req.teacher.tokens = [];
    await req.teacher.save();
    res.send();
  } catch (err) {
    res.status(500).send();
  }
};

exports.updateTeacher = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'age', 'password'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' });
  }
  try {
    updates.forEach(update => req.teacher[update] = req.body[update]);
    await req.teacher.save();
    res.send(req.teacher);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    await req.teacher.remove();
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getTeacher = async (req, res) => {
  const populatedTeacher = await populateWithLessons(req.teacher);
  res.send(populatedTeacher);
};

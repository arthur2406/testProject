'use strict';

const jwt = require('jsonwebtoken');
const { findAuthTeacher } = require('../db/teacherDB');


const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const teacher = await findAuthTeacher(decoded._id, token);
    if (!teacher) {
      throw new Error();
    }
    // eslint-disable-next-line require-atomic-updates
    req.token = token;
    // eslint-disable-next-line require-atomic-updates
    req.teacher = teacher;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

module.exports = auth;

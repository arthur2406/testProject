'use strict';

const express = require('express');
const { createAndGetTeacher,
  loginAndGetTeacher,
  logoutTeacher,
  logoutAllTeacher,
  getTeacher,
  updateTeacher,
  deleteTeacher } = require('../../controllers/TeacherController');

const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/teachers', createAndGetTeacher);

router.post('/teachers/login', loginAndGetTeacher);

router.post('/teachers/logout', auth, logoutTeacher);

//logs out from all devices
router.post('/teachers/logout', auth, logoutAllTeacher);

router.get('/teachers/me', auth, getTeacher);

router.patch('/teachers/me', auth, updateTeacher);

router.delete('/teachers/me', auth, deleteTeacher);

module.exports = router;

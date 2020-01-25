'use strict';

const express = require('express');
const { createAndGetStudent,
  loginAndGetStudent,
  logoutStudent,
  logoutAllStudent,
  getStudent,
  updateStudent,
  deleteStudent } = require('../../controllers/studentController');

const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/students', createAndGetStudent);

router.post('/students/login', loginAndGetStudent);

router.post('/students/logout', auth, logoutStudent);

//logs out from all devices
router.post('/students/logout', auth, logoutAllStudent);

router.get('/students/me', auth, getStudent);

router.patch('/students/me', auth, updateStudent);

router.delete('/students/me', auth, deleteStudent);

module.exports = router;

'use strict';

const express = require('express');
const studentController = require('../../controllers/studentController');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/students', studentController.createAndGetStudent);

router.post('/students/login', studentController.loginAndGetStudent);

router.post('/students/logout', auth.studentAuth, studentController.logoutStudent);

//logs out from all devices
router.post('/students/logout', auth.studentAuth, studentController.logoutAllStudent);

router.get('/students/me', auth.studentAuth, studentController.getStudent);

router.patch('/students/me', auth.studentAuth, studentController.updateStudent);

router.delete('/students/me', auth.studentAuth, studentController.deleteStudent);

module.exports = router;

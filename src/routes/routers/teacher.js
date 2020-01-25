'use strict';

const express = require('express');
const teacherController = require('../../controllers/teacherController');
const auth = require('../middleware/auth.teacherAuth');

const router = new express.Router();

router.post('/teachers', teacherController.createAndGetTeacher);

router.post('/teachers/login', teacherController.loginAndGetTeacher);

router.post('/teachers/logout', auth.teacherAuth, teacherController.logoutTeacher);

//logs out from all devices
router.post('/teachers/logout', auth.teacherAuth, teacherController.logoutAllTeacher);

router.get('/teachers/me', auth.teacherAuth, teacherController.getTeacher);

router.patch('/teachers/me', auth.teacherAuth, teacherController.updateTeacher);

router.delete('/teachers/me', auth.teacherAuth, teacherController.deleteTeacher);

module.exports = router;

'use strict';

const express = require('express');
const teacherController = require('../../controllers/teacherController');
const auth = require('../../middlewares/auth');

const router = new express.Router();

router.post('/teachers', teacherController.createAndGetTeacher);

router.post('/teachers/login', teacherController.loginAndGetTeacher);

router.post('/teachers/logout', auth, teacherController.logoutTeacher);

//logs out from all devices
router.post('/teachers/logoutAll', auth, teacherController.logoutAllTeacher);

router.get('/teachers/me', auth, teacherController.getTeacher);

router.patch('/teachers/me', auth, teacherController.updateTeacher);

router.delete('/teachers/me', auth, teacherController.deleteTeacher);

module.exports = router;

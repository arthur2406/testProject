'use strict';

const express = require('express');
const groupController = require('../../controllers/groupController');
//const auth = require('../../middlewares/auth')

const router = new express.Router();

//POST /groups - creates group and returns is
router.post('/groups', groupController.createAndGetGroup);

//GET /groups - gets group(using query)
router.get('/groups', groupController.getGroups);

//GET /groups/:id - get group by its id
router.get('/groups/:id', groupController.getGroupById);

//PATCH /groups/:id updates group and returns it
router.patch('/groups/:id', groupController.updateAndGetGroup);

//DELETE /groups/:id - deletes group and returns
router.delete('/groups/:id', groupController.deleteAndGetGroup);



module.exports = router;

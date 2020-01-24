'use strict';

const { createGroup, fetchGroups, fetchGroupById, updateGroup, deleteGroup } = require('../db/mongoose');

exports.createAndGetGroup = async (req, res) => {
  try {
    const createdGroup = await createGroup(req.body);
    res.send(createdGroup);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getGroups = async (req, res) => {
  const groups = await fetchGroups();
  res.send(groups);
};

exports.getGroupById = async (req, res) => {
  const _id = req.params.id;
  try {
    const group = await fetchGroupById(_id);
    if (!group) {
      return res.status(404).send();
    }
    res.send(group);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateAndGetGroup = async (req, res) => {
  const _id = req.params.id;
  const updatesKeys = Object.keys(req.body);

  //Here we can state updates that will be allowed
  const allowedUpdatesKeys = ['name'];
  const isValidOperation = updatesKeys.every(updateKey => allowedUpdatesKeys.includes(updateKey));
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' });
  }
  try {
    const updates = req.body;
    const group = await updateGroup(_id, updatesKeys, updates);
    if (!group) {
      return res.status(404).send();
    }
    res.send(group);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteAndGetGroup = async (req, res) => {
  const _id = req.params.id;
  try {
    const group = await deleteGroup(_id);
    if (!group) {
      return res.status(404).send();
    }
    res.send(group);
  } catch (err) {
    res.status(500).send(err);
  }
};

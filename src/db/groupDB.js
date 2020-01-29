'use strict';

const Group = require('../models/group');
const Lesson = require('../models/lesson');

//CRUD operations for group

const createGroup = async body => {
  const group = new Group(body);
  try {
    await group.save();
    return group;
  } catch (err) {
    throw new Error(err);
  }
};

const fetchGroups = async () => {
  const groups = await Group.find({}).select('name _id');
  return groups;
};

const fetchGroupById = async id => {
  try {
    const group = await Group.findById(id);
    if (!group) {
      return undefined;
    }
    //Findind all lessons for this group
    const lessons = await Lesson.find({ groupOfStudents: id });
    for (const lesson of lessons) {
      await lesson
        .populate({
          path: 'teacher',
          select: 'name -_id'
        })
        .populate({
          path: 'groupOfStudents',
          select: 'name -_id'
        })
        .execPopulate();
    }
    group.lessons = lessons;
    return group;
  } catch (err) {
    throw new Error(err);
  }
};

const updateGroup = async (id, updatesKeys, updates) => {
  try {
    const group = await Group.findById(id);
    if (!group) {
      return undefined;
    }
    updatesKeys.forEach(updateKey => group[updateKey] = updates[updateKey]);
    await group.save();
    return group;
  } catch (err) {
    throw new Error(err);
  }
};

const deleteGroup = async id => {
  try {
    const group = await Group.findById(id);
    if (!group) {
      return undefined;
    }
    await group.remove();
    return group;
  } catch (err) {
    throw new Error(err);
  }
};


module.exports = {
  createGroup,
  fetchGroups,
  fetchGroupById,
  updateGroup,
  deleteGroup,
};

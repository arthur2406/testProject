'use strict';

const Group = require('../models/group');
const Lesson = require('../models/Lesson');

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

//TODO: fix bug -> cannot fetch lessons for each group, bcs filter doesn't work properly
const fetchGroups = async () => {
  const groups = await Group.find({});
  // const lessons = await Lesson.find({});
  // for (const group of groups) {
  //   group.lessons = lessons.filter(lesson => (console.log(lesson.groupOfStudents === group._id), lesson.groupOfStudents === group._id));
  // }
  return groups;
};

const fetchGroupById = async id => {
  try {
    const group = await Group.findById(id);
    //Findind all lessons for this group
    const lessons = await Lesson.find({ groupOfStudents: id });
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

'use strict';


const mongoose = require('mongoose');
const Lesson = require('../models/lesson');
const Group = require('../models/group');


//DB connection
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Connected to db');
}).catch(() => {
  console.log('Cannot connect to db!');
});

//CRUD operations for lesson

const fetchLessons =  async () => {
  const lessons = await Lesson.find({});
  return lessons;
};

const createLesson = async body => {
  const lesson = new Lesson(body);
  try {
    await lesson.save();
    return lesson;
  } catch (err) {
    throw new Error(err);
  }
};


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
  const groups = await Group.find({});
  return groups;
};

const fetchGroupById = async id => {
  try {
    const group = await Group.findById(id);
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
  fetchLessons,
  createLesson,
  createGroup,
  fetchGroups,
  fetchGroupById,
  updateGroup,
  deleteGroup,
};

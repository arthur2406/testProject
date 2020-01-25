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
  for (let i = 0; i < lessons.length; ++i) {
    try {
      await lessons[i]
        .populate({
          path: 'groupOfStudents',
          select: 'name -_id',
        })
        .execPopulate();
    } catch (err) {
      throw new Error(err);
    }
  }
  return lessons;
};

const fetchLessonById = async id => {
  try {
    const lesson = await Lesson.findById(id);
    await lesson
      .populate({
        path: 'groupOfStudents',
        select: 'name -_id',
      })
      .execPopulate();
    return lesson;
  } catch (err) {
    throw new Error(err);
  }
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

const updateLesson = async (id, updatesKeys, updates) => {
  try {
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return undefined;
    }
    updatesKeys.forEach(updateKey => lesson[updateKey] = updates[updateKey]);
    await lesson.save();
    return lesson;
  } catch (err) {
    throw new Error(err);
  }
};

const deleteLesson = async id => {
  try {
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return undefined;
    }
    await lesson.remove();
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
  fetchLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
  createGroup,
  fetchGroups,
  fetchGroupById,
  updateGroup,
  deleteGroup,
};

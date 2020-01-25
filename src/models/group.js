'use strict';

const mongoose = require('mongoose');
const Lesson = require('../models/lesson');

const groupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  lessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }]
});

//Delete all lessons before removing group
groupSchema.pre('remove', async function (next) {
  const group = this;
  await Lesson.deleteMany({ groupOfStudents: group._id });
  next();
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;

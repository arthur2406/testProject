'use strict';

const mongoose = require('mongoose');

//Creating a lesson schema
const lessonSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  groupOfStudents: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
  startsAt: {
    type: Date,
    required: true
  },
  audience: {
    type: Number,
    required: true
  }
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;

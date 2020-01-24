'use strict';


const mongoose = require('mongoose');

//Creating a lesson schema
const lessonSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    trim: true
  },
  lecturer: {
    type: String,
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

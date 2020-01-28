'use strict';

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const teacherSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 7,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password musn\'t be \'password\'');
      }
    }
  },
  age: {
    type: Number,
    default: 25,
    validate(value) {
      if (value < 25) {
        throw new Error('Teacher must be at least 25 years old');
      }
    },
  },
  seniority: {
    type: Number,
    default: 0,
    validate(value) {
      if (value > this.age) {
        throw new Error('Teacher cannot have seniority bigger than his age');
      }
    }
  },
  lessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  tokens: [{
    token: {
      type: String,
      required: true,
    }
  }],
});




teacherSchema.methods.generateAuthToken = async function () {
  const teacher = this;
  const token = jwt.sign({ _id: teacher._id.toString() }, process.env.JWT_SECRET);
  teacher.tokens = teacher.tokens.concat({ token });
  await teacher.save();
  return token;
};

teacherSchema.methods.toJSON = function () {
  const teacher = this;
  const teacherObject = teacher.toObject();

  delete teacherObject.password;
  delete teacherObject.tokens;

  return teacherObject;
};

teacherSchema.statics.findByCredentials = async (email, password) => {
  const teacher = await Teacher.findOne({ email });
  if (!teacher) {
    throw new Error('Unable to login');
  }
  const isMatch = await bcrypt.compare(password, teacher.password);
  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return teacher;
};

//Hash the plain text password before save
teacherSchema.pre('save', async function (next) {
  const teacher = this;
  if (teacher.isModified('password')) {
    teacher.password = await bcrypt.hash(teacher.password, 8);
  }
  next();
});


const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;

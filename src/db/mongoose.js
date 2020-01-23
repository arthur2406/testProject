'use strict';


const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}, () => console.log('connected to db'));
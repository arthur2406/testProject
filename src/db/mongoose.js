'use strict';


const mongoose = require('mongoose');

//DB connection
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => {
  console.log('OK, Connected to db');
}).catch(() => {
  console.log('Error, cannot connect to db!');
});


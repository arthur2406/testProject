'use strict';

const express = require('express');
const lessonRouter = require('./routers/lesson');
const groupRouter = require('./routers/group');
//const controllers = require('../controllers');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(lessonRouter);
app.use(groupRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
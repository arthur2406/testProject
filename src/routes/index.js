'use strict';

const express = require('express');
const lessonRouter = require('./routers/lesson');
const groupRouter = require('./routers/group');
const teacherRouter = require('./routers/teacher');
const studentRouter = require('./routers/student');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(lessonRouter);
app.use(groupRouter);
app.use(teacherRouter);
app.use(studentRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});

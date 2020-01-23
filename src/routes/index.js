'use strict';

const express = require('express');
//const controllers = require('../controllers');

const port = process.env.PORT || 3000;
const app = express();



app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
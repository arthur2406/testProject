'use strict';

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'config/.env') });
require('./db/mongoose');
require('./routes/index');

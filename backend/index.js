const content = require('./content');
require('dotenv').config();



content(process.env.BACKEND_PORT);

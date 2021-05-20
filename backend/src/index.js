const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.resolve(process.cwd(), '.env.local')});
if (!process.env.BACKEND_URL) {
  dotenv.config({path: path.resolve(process.cwd(), '.env')});
}

const content = require('./content');

content(process.env.PORT || process.env.BACKEND_PORT);

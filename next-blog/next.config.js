const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.resolve(process.cwd(), '.env.local')});
if (!process.env.BACKEND_URL) {
  dotenv.config({path: path.resolve(process.cwd(), '.env')});
}

module.exports = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL
  },
};

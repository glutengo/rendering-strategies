import express from 'express';
const compression = require('compression');

// we'll talk about this in a minute:
import serverRenderer from './middleware/renderer';

const PORT = 3001;
const path = require('path');

// initialize the application and create the routes
const app = express();
const router = express.Router();

app.use(compression());

// root (/) should always serve our server rendered page
router.use('^/$', serverRenderer);

// other static resources should just be served as they are
router.use(express.static(
  path.resolve(__dirname, '..', 'build'),
  { maxAge: '30d' },
));

// anything else should act as our index page
// react-router will take care of everything
router.use('*', serverRenderer);

// tell the app to use the above rules
app.use(router);

// start the app
app.listen(PORT, (error) => {
  console.log(`listening on port ${PORT}`);
});

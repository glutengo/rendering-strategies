const express = require('express');
const cors = require('cors');
const join = require('path').join;
const app = express();
const RES_FOLDER = join(process.cwd(), 'res');
const fs = require('fs');
const renderMarkdown = require('./render-markdown');

module.exports = function bootstrap(port) {

  app.use(cors());
  app.use(express.static(RES_FOLDER));

  app.get('/post/:id', (req, res) => {
    const fileUrl = join(RES_FOLDER, 'posts', req.params.id, `${req.params.id}.md`);
    const content = fs.readFileSync(fileUrl, 'utf-8');
    const resourceUrl = `${req.protocol}://${req.headers.host}/posts/${req.params.id}/`;
    const refererURL = req.headers.referer || req.headers['x-referer'];
    const basePath = refererURL ? new URL(req.headers.referer || req.headers['x-referer']).pathname : `./${req.params.id}`;
    res.write(renderMarkdown(content, resourceUrl, basePath));
    res.end();
  });

  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
};


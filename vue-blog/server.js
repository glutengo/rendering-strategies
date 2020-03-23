const express = require('express');
const {createBundleRenderer} = require('vue-server-renderer');
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');
const template = require('fs').readFileSync('./src/templates/index.template.html', 'utf-8');
require('dotenv').config();

const server = express();

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
});

server.get('^/$', (req, res) => {
  res.redirect(302, '/posts/home');
});

server.use(express.static('dist'));

// inside a server handler...
server.get('*', (req, res) => {

  const context = {
    url: req.url,
    title: req.url.split('/').pop(),
    backendUrl: process.env.VUE_APP_BACKEND_URL
  };

  process.request = req;
  process.VUE_HTTP_CACHE = {};

  // No need to pass an app here because it is auto-created by
  // executing the bundle. Now our server is decoupled from our Vue app!
  renderer.renderToString(context, (err, html) => {

    if (err) {
      console.log(err);
      res.end('error');
    }

    // handle error...
    res.end(html.replace('VUE_HTTP_CACHE_OUTLET', JSON.stringify(process.VUE_HTTP_CACHE)));
  })
});

server.listen(5002, () => console.log(`http://localhost:${5002}`));

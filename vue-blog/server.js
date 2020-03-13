const express = require('express');
const {createBundleRenderer} = require('vue-server-renderer');
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');
const template = require('fs').readFileSync('./src/templates/index.template.html', 'utf-8');

const server = express();

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
});

server.use(express.static('dist'));

// inside a server handler...
server.get('*', (req, res) => {
  const context = {url: req.url};

  process.request = req;
  process.VUE_HTTP_CACHE = {};

  // No need to pass an app here because it is auto-created by
  // executing the bundle. Now our server is decoupled from our Vue app!
  renderer.renderToString(context, (err, html) => {

    // handle error...
    res.end(html.replace('VUE_HTTP_CACHE_OUTLET', JSON.stringify(process.VUE_HTTP_CACHE)));
  })
});

server.listen(8081, () => console.log(`http://localhost:${8081}`));

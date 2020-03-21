import React from 'react'
import ReactDOMServer from 'react-dom/server'

// import our main App component
import App from '../../src/App';
import {getOptions, getPost, getToc} from '../../src/util/data.util';

const path = require('path');
const fs = require('fs');

export default (req, res, next) => {

  process.request = req;

  // point to the html file created by CRA's build tool
  const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

  fs.readFile(filePath, 'utf8', async (err, htmlData) => {
    if (err) {
      console.error('err', err);
      return res.status(404).end()
    }

    const id = req.baseUrl.split('/').pop();

    const toc = await getToc();
    const postContent = await getPost(id);
    const renderingOptions = await getOptions();

    const cachedData = { toc, postContent, renderingOptions };

    const context = {};

    // render the app as a string
    const html = ReactDOMServer.renderToString(<App context={context} location={req.baseUrl} toc={toc} postContent={postContent}
                                                    renderingOptions={renderingOptions}/>);

    if (context.url) {
      res.redirect(302, context.url);
      return;
    }

    // inject the rendered app into our html and send it
    return res.send(
      htmlData
        .replace(/%REACT_APP_TITLE%/g, id)
        .replace(
          '<script>window.REACT_HTTP_CACHE={}</script>',
          `<script>window.REACT_HTTP_CACHE=${JSON.stringify(cachedData)}</script>`,
        )
        .replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
        )
    );
  });
}

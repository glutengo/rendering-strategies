import React from 'react'
import ReactDOMServer from 'react-dom/server'

// import our main App component
import App from '../../src/App';
import {getOptions, getPost, getToc} from '../../src/util/data.util';

const path = require('path');
const fs = require('fs');

export default (req, res, next) => {

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

    process.request = req;

    // render the app as a string
    const html = ReactDOMServer.renderToString(<App location={req.baseUrl} toc={toc} postContent={postContent}
                                                    renderingOptions={renderingOptions}/>);

    // inject the rendered app into our html and send it
    return res.send(
      htmlData
        .replace('__DOCUMENT_TITLE__', id)
        .replace('__OG_TITLE__', id)
        .replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
        )
    );
  });
}

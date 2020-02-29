import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const { toc, postContent, renderingOptions } = window.REACT_HTTP_CACHE;

if (toc && postContent && renderingOptions) {
  ReactDOM.hydrate(<App toc={toc} postContent={postContent}
                        renderingOptions={renderingOptions}/>, document.getElementById('root'));

} else {
  ReactDOM.render(<App/>, document.getElementById('root'))
}


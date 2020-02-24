import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const { toc, postContent, renderingOptions } = window.REACT_HTTP_CACHE;

ReactDOM.render(<App toc={toc} postContent={postContent}
                     renderingOptions={renderingOptions}/>, document.getElementById('root'));

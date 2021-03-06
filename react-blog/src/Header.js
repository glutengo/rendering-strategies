import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {getOptions} from './util/data.util';
import {Helmet} from 'react-helmet';

export function Header(props) {

  const [options, setOptions] = useState(props.options || []);
  const location = useLocation();

  function getPageUrl(url) {
    return `${url}${location.pathname}`;
  }

  function onSelectChanged(url) {
    window.location.href = getPageUrl(url);
  }

  function isActive(option) {
    return option.platform === 'react' && option.technique === process.env.REACT_APP_RENDERING_TECHNIQUE ?  'selected' : undefined;
  }

  function onClickMenu() {
    document.body.classList.toggle('menu-open');
  }

  useEffect(() => {
    if (!options.length) {
      getOptions()
        .then(data => setOptions(data));
    }
  }, [options.length]);

  const postId = location.pathname.split('/').pop();

  return <section className="page-header">
    <Helmet>
      <title>{postId}</title>
      <meta property="og:title" content={postId}/>
    </Helmet>
    <div className="header-content">
      <button className="toggle-menu" onClick={ () => onClickMenu()}></button>
      <h3><a href="/">Rendering Strategies for Web Apps</a></h3>
      <select onChange={ event => onSelectChanged(event.target.value)}>
        {
          options.map((option, index) =>
            <option key={index} value={option.url} selected={isActive(option)}>{option.platform}:{option.technique}</option>
          )
        }
      </select>
    </div>
  </section>
}

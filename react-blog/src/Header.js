import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {getOptions} from './util/data.util';
import {getRequestLocation} from './util/env.util';
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
    const requestLocation = getRequestLocation();
    const url = new URL(option.url);
    return url.protocol === requestLocation.protocol &&
      url.hostname === requestLocation.hostname &&
      url.port === requestLocation.port;
  }

  function getActiveValue() {
    const activeOption = options.find(o => isActive(o));
    return activeOption && activeOption.url;
  }

  useEffect(() => {
      getOptions()
        .then(data => setOptions(data));
  }, []);

  const postId = location.pathname.split('/').pop();

  return <section className="page-header">
    <Helmet>
      <title>{postId}</title>
      <meta property="og:title" content={postId}/>
    </Helmet>
    <div className="header-content">
      <h3>Rendering Strategies for Web Apps</h3>
      <select value={getActiveValue()} onChange={ event => onSelectChanged(event.target.value)}>
        {
          options.map((option, index) =>
            <option key={index} value={option.url}>{option.platform}:{option.technique}</option>
          )
        }
      </select>
    </div>
  </section>
}

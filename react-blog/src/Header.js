import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

export function Header() {

  const [options, setOptions] = useState([]);
  const location = useLocation();

  function getPageUrl(url) {
    return `${url}${location.pathname}`;
  }

  function onSelectChanged(url) {
    window.location.href = getPageUrl(url);
  }

  function isActive(option) {
    const url = new URL(option.url);
    return url.protocol === document.location.protocol &&
      url.hostname === document.location.hostname &&
      url.port === document.location.port;
  }

  function getActiveValue() {
    const activeOption = options.find(o => isActive(o));
    return activeOption && activeOption.url;
  }

  useEffect(() => {
    fetch(`http://localhost:8082/options.json`)
      .then(response => response.json())
      .then(data => setOptions(data));
  }, []);

  return <section className="page-header">
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

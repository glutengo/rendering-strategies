import React from 'react';
import {useRouter} from 'next/router';
import {useCache, withCache} from '../util/http-cache.util';

export function Header(props) {

  const { options, location } = withCache(props);
  const router = useRouter();

  function getPageUrl(url) {
    return `${url}${router.asPath}`;
  }

  function onSelectChanged(url) {
    window.location.href = getPageUrl(url);
  }

  function isActive(option) {
    const url = new URL(option.url);
    return url.protocol.split(':')[0] === location.protocol &&
      url.hostname === location.hostname &&
      parseInt(url.port) === location.port;
  }

  function getActiveValue() {
    const activeOption = options.find(o => {
      const active = isActive(o);
      return active;
    });
    return activeOption && activeOption.url;
  }

  function onClickMenu() {
    document.body.classList.toggle('menu-open');
  }

  return <section className="page-header">
    <div className="header-content">
      <button className="toggle-menu" onClick={ () => onClickMenu()}></button>
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

Header.getInitialProps = async function(context) {
  let location = {};
  if (context && context.req) {
    const host = context.req.headers['host'].split(':');
    location = {
      port: parseInt(host[1]),
      hostname: host[0],
      protocol: 'http'
    };
  }
  const options = await useCache(`http://localhost:8082/options.json`, 'options');
  return { options, location };
};

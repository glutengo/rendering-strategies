import React from 'react';
import {useRouter} from 'next/router';
import {useCache, withCache} from '../util/http-cache.util';
import {getBaseURL, getLocation} from '../util/env.util';

export function Header(props) {

  let { options, location } = withCache(props);
  if (process.browser) {
    location = getLocation();
  }
  const router = useRouter();

  function getPageUrl(url) {
    return `${url}${router.asPath}`;
  }

  function onSelectChanged(url) {
    window.location.href = getPageUrl(url);
  }

  function isActive(option) {
    const url = new URL(option.url);
    return url.protocol === location.protocol &&
      url.hostname === location.hostname &&
      url.port === location.port;
  }

  function getSelectedValue() {
    const selectedOption = options.find(o => isActive(o));
    console.log(selectedOption);
    return selectedOption && selectedOption.url;
  }

  function onClickMenu() {
    document.body.classList.toggle('menu-open');
  }

  return <section className="page-header">
    <div className="header-content">
      <button className="toggle-menu" onClick={ () => onClickMenu()}></button>
      <h3>Rendering Strategies for Web Apps</h3>
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

Header.getInitialProps = async function(context) {
  let location = getLocation(context);
  const options = await useCache(`${getBaseURL(context)}/options`, 'options');
  return { options, location };
};

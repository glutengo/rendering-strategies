import React from 'react';
import {useRouter} from 'next/router';
import {useCache, withCache} from '../util/http-cache.util';
import {getBaseURL} from '../util/env.util';

export function Header(props) {

  let { options } = withCache(props);
  const router = useRouter();

  function getPageUrl(url) {
    return `${url}${router.asPath}`;
  }

  function onSelectChanged(url) {
    window.location.href = getPageUrl(url);
  }

  function isActive(option) {
    return option.platform === 'next';
  }

  function onClickMenu() {
    document.body.classList.toggle('menu-open');
  }

  return <section className="page-header">
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

Header.getInitialProps = async function(context) {
  const options = await useCache(`${getBaseURL(context)}/options`, 'options');
  return { options };
};

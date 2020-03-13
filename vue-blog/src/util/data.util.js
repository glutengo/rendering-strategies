import {getRequestLocation, isBrowser} from './env.util';

require('isomorphic-fetch');

const fetchWithCache = (url, json) => new Promise((resolve, reject) => {
  if (isBrowser()) {
    if (window.VUE_HTTP_CACHE && window.VUE_HTTP_CACHE[url]) {
      resolve(window.VUE_HTTP_CACHE[url]);
    } else {
      fetch(url)
        .then(response => json ? response.json() : response.text())
        .then(response => resolve(response), error => reject(error));
    }
  } else {
    fetch(url)
      .then(response => json ? response.json() : response.text())
      .then(response => {
        process.VUE_HTTP_CACHE[url] = response;
        resolve(response);
      }, error => reject(error))
  }
});

function getBaseURL() {
  const location = getRequestLocation();
  return `${location.protocol}//${location.hostname}`;
}

export function getPost(id) {
  return fetchWithCache(`${getBaseURL()}:8082/post/${id}`);
}

export function getToc() {
  return fetchWithCache(`${getBaseURL()}:8082/posts/toc.json`, true);
}

export function getOptions() {
  return fetchWithCache(`${getBaseURL()}:8082/options`, true);
}

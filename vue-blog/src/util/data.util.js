import {isBrowser} from './env.util';

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
  return process.env.VUE_APP_BACKEND_URL;
}

export function getPost(id) {
  return fetchWithCache(`${getBaseURL()}/post/${id}`);
}

export function getToc() {
  return fetchWithCache(`${getBaseURL()}/posts/toc.json`, true);
}

export function getOptions() {
  return fetchWithCache(`${getBaseURL()}/options`, true);
}

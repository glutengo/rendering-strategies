import {getRequestLocation} from './env.util';
require('isomorphic-fetch');

function getBaseURL() {
  const location = getRequestLocation();
  return `${location.protocol}//${location.hostname}`;
}

export function getPost(id) {
  return fetch(`${getBaseURL()}:8082/post/${id}`)
    .then(response => response.text())
}

export function getToc() {
  return fetch(`${getBaseURL()}:8082/posts/toc.json`)
    .then(response => response.json());
}

export function getOptions() {
  return fetch(`${getBaseURL()}:8082/options`)
    .then(response => response.json());
}

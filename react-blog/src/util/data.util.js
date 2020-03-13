require('isomorphic-fetch');
require('dotenv').config();

function getBaseURL() {
  return process.env.REACT_APP_BACKEND_URL;
}

export function getPost(id) {
  return fetch(`${getBaseURL()}/post/${id}`)
    .then(response => response.text())
}

export function getToc() {
  return fetch(`${getBaseURL()}/posts/toc.json`)
    .then(response => response.json());
}

export function getOptions() {
  return fetch(`${getBaseURL()}/options`)
    .then(response => response.json());
}

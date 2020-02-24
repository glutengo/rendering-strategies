require('isomorphic-fetch');

export function getPost(id) {
  return fetch(`http://localhost:8082/post/${id}`)
    .then(response => response.text())
}

export function getToc() {
  return fetch(`http://localhost:8082/posts/toc.json`)
    .then(response => response.json());
}

export function getOptions() {
  return fetch(`http://localhost:8082/options.json`)
    .then(response => response.json());
}

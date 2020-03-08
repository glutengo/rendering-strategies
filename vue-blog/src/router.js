import Router from 'vue-router';
import Vue from 'vue'
import Post from './components/Post';

Vue.use(Router);

export function createRouter() {
  const routes = [
    {
      path: '/posts/:id', component: Post
    }
  ];

  return  new Router({ routes, mode: 'history' });
}

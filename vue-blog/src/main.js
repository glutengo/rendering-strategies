import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Post from './components/Post';

Vue.config.productionTip = false

const routes = [
  {
    path: '/posts/:id', component: Post
  }
];

const router = new VueRouter({ routes, mode: 'history' });

Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

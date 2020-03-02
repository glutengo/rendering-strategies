<template>
  <div id="app">
    <Header></Header>
    <section class="page-menu" v-on:click="onClickMenu">
      <PostList></PostList>
    </section>
    <section class="page-content">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
  import PostList from './components/PostList';
  import Header from './components/Header';

  export default {
    name: 'App',
    components: {Header, PostList},
    methods: {
      onClickMenu() {
        document.body.classList.remove('menu-open');
      }
    }
  }
</script>


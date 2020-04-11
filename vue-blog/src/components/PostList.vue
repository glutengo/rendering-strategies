<template>
  <ul class="post-list">
      <router-link
        v-for="post of posts" v-bind:key="post.path"
        v-bind:to="post.path"
        v-slot="{ href, route, navigate, isActive }">
        <li :class="[isActive && 'active']">
          <a :href="href" @click="navigate">{{ post.title }}</a>
          <ul v-if="post.children">
            <router-link
              v-for="child of post.children" v-bind:key="child.path"
              v-bind:to="child.path"
              v-slot="{ href, route, navigate, isActive }">
              <li :class="[isActive && 'active']"><a :href="href" @click="navigate">{{ child.title }}</a></li>
            </router-link>
          </ul>
        </li>
      </router-link>
  </ul>
</template>

<script>
  import {getToc, getTocFromCache} from '../util/data.util';

  export default {
    name: 'PostList',
    data() {
      return {
        posts: getTocFromCache()
      }
    },
    mounted() {
      if (!this.posts.length) {
        this.fetchData();
      }
    },
    async serverPrefetch() {
      await this.fetchData();
    },
    methods: {
      async fetchData() {
        this.posts = await getToc();
      }
    }
  }
</script>

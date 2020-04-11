<template>
  <div class="post" v-html="content" v-on:click="clickPost">
  </div>
</template>

<script>
  import {getPost, getPostFromCache} from '../util/data.util';
  import {isBrowser} from '../util/env.util';

  export default {
    name: 'Post',
    data() {
      return {
        content: getPostFromCache(this.$route.params.id)
      }
    },
    mounted() {
      this.setMeta(this.$route.params.id);
      this.fetchData(this.$route.params.id);
    },
    beforeRouteUpdate(to, from, next) {
      this.setMeta(to.params.id);
      this.fetchData(to.params.id);
      next();
    },
    async serverPrefetch() {
      this.setMeta(this.$route.params.id);
      await this.fetchData(this.$route.params.id);
    },
    methods: {
      async fetchData(id) {
        this.content = await getPost(id);
      },
      setMeta(title) {
        if (isBrowser()) {
          document.title = title;
          document.head.querySelector('meta[name="og:title"]').setAttribute('value', title);
        }
      },
      clickPost(event) {
        const href = event.target.getAttribute('href');
        if (href) {
          if (href.startsWith('http') || href.startsWith('#')) {
            return;
          } else {
            this.$router.push((href));
            event.preventDefault();
          }
        }
      }
    }
  }
</script>

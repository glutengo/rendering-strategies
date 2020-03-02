<template>
  <div class="post" v-html="content" v-on:click="clickPost">
  </div>
</template>

<script>
  import {getPost} from '../util/data.util';

  export default {
    name: 'Post',
    data() {
      return {
        content: null
      }
    },
    created() {
      this.setMeta(this.$route.params.id);
      this.fetchData(this.$route.params.id);
    },
    beforeRouteUpdate(to, from, next) {
      this.setMeta(to.params.id);
      this.fetchData(to.params.id);
      next();
    },
    methods: {
      async fetchData(id) {
        this.content = await getPost(id);
      },
      setMeta(title) {
        document.title = title;
        document.head.querySelector('meta[name="og:title"]').content = title;
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

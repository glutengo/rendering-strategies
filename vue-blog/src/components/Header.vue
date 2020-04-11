<template>
  <section class="page-header">
    <div class="header-content">
      <button class="toggle-menu" v-on:click="onClickMenu"></button>
      <h3><a href="/">Rendering Strategies for Web Apps</a></h3>
      <select v-on:change="onSelectChanged">
        <option v-for="option of options" v-bind:key="option.url" v-bind:value="option.url"
                v-bind:selected="isActive(option)">
          {{option.platform}}:{{option.technique}}
        </option>
      </select>
    </div>
  </section>
</template>

<script>
  import {getOptions, getOptionsFromCache} from '../util/data.util';

  export default {
    name: 'Header',
    data() {
      return {
        options: getOptionsFromCache()
      }
    },
    mounted() {
      this.fetchData();
    },
    async serverPrefetch() {
      await this.fetchData();
    },
    methods: {
      async fetchData() {
        this.options = await getOptions();
      },
      isActive(option) {
        return option.platform === 'vue' && option.technique === process.env.VUE_APP_RENDERING_TECHNIQUE;
      },
      onClickMenu() {
        document.body.classList.toggle('menu-open');
      },
      onSelectChanged(event) {
        window.location.href = `${event.target.value}${this.$route.path}`
      }
    }
  }
</script>

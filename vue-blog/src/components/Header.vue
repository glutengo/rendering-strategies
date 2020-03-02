<template>
  <section class="page-header">
    <div class="header-content">
      <button class="toggle-menu" v-on:click="onClickMenu"></button>
      <h3>Rendering Strategies for Web Apps</h3>
      <select v-on:change="onSelectChanged">
        <option v-for="option of options" v-bind:key="option.url" v-bind:value="option.url" v-bind:selected="isActive(option)">
          {{option.platform}}:{{option.technique}}
        </option>
      </select>
    </div>
  </section>
</template>

<script>
  import {getOptions} from '../util/data.util';

  export default {
    name: 'Header',
    data() {
      return {
        options: []
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        this.options = await getOptions();
      },
      isActive(option) {
        const location = document.location;
        const url = new URL(option.url);
        return url.protocol === location.protocol &&
          url.hostname === location.hostname &&
          url.port === location.port;
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

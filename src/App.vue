<template>
  <div id="app">
    <div class="container">
      <Header />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/layout/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.center-block {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>


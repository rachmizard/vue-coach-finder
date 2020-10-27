<template>
  <div id="app">
    <Header />
    <vue-page-transition name="fade-in-right">
      <router-view />
    </vue-page-transition>
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
.center-block {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.router-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.router-enter-active {
  transition: all 0.3s ease-out;
}

.router-leave-active {
  transition: all 0.3s ease-in;
}

.router-enter-to,
.router-leaver-from {
  opacity: 1;
  transform: translateY(0);
}


</style>


<template>
  <div>
    <header>
      <nav class="navbar navbar-inverse">
        <div class="container-fluid">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button
              type="button"
              class="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false"
            >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <base-button link mode="navbar-brand" to="/"
              >Find a Coach</base-button
            >
          </div>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <div
            class="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul class="nav navbar-nav">
              <li>
                <router-link to="/coaches"
                  >All Coaches
                  <span class="sr-only">(current)</span></router-link
                >
              </li>
              <li>
                <router-link to="/requests"
                  >Your Requests
                  <span class="badge">{{ isLoading ? `Loading..` : totalRequests }}</span></router-link
                >
              </li>
              <li class="dropdown"></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li>
                <router-link to="/register">Register as Coach</router-link>
              </li>
              <li class="dropdown">
                <a
                  href="#"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  >Account <span class="caret"></span
                ></a>
                <ul class="dropdown-menu">
                  <li><a href="#">Profile</a></li>
                  <li><a href="#">Log out</a></li>
                </ul>
              </li>
            </ul>
          </div>
          <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isLoading: false,
    };
  },
  created() {
    this.loadRequests();
  },
  computed: {
    totalRequests() {
      return this.$store.getters.getRequests.length;
    },
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      await this.$store.dispatch("setRequests");
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
</style>
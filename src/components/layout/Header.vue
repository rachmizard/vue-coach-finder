<template>
  <div>
    <header>
      <nav class="navbar navbar-inverse">
        <div class="container">
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
              <li v-if="isLoggedIn && userIdentity">
                <router-link to="/requests"
                  >Your Requests
                  <span class="badge">{{ isLoading ? `Loading..` : totalRequests }}</span></router-link
                >
              </li>
              <li class="dropdown"></li>
            </ul>
            <ul v-if="isLoggedIn && userIdentity" class="nav navbar-nav navbar-right">
              <li class="dropdown">
                <a
                  href="#"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  > {{ userIdentity.email }} <span class="caret"></span
                ></a>
                <ul class="dropdown-menu">
                  <li><a href="#">Profile</a></li>
                  <li><a href="#" @click="logout">Log out</a></li>
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
    if(this.isLoggedIn) {
      this.loadRequests();
      this.loadUser();
    }
  },
  computed: {
    totalRequests() {
      return this.$store.getters.getRequests.length;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    userIdentity() {
      return this.$store.getters.getAuthUser;
    }
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      await this.$store.dispatch("setRequests");
      this.isLoading = false;
    },
    async loadUser(force = false) {
      this.isLoading = true;
      await this.$store.dispatch("setUser", { forceRefresh: force });
      this.isLoading = false;
    },
    logout() {
      this.$store.dispatch('logout');
    }
  },
};
</script>

<style scoped>
</style>
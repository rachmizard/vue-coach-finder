<template>
  <div>
    <header>
      <nav class="navbar navbar-default">
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
                <router-link  to="/"
                  >Invitation <base-badge v-if="invitations > 0">{{ isLoading ? 'Loading..'  : invitations }}</base-badge></router-link
                >
              </li>
              <li class="dropdown"></li>
            </ul>
            <ul  class="nav navbar-nav navbar-right">
              <li v-if="isLoggedIn && userIdentity" class="dropdown">
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
                  <li><base-button link to="/profile">Profile</base-button></li>
                  <li><base-button link to="/requests">My Requests </base-button></li>
                  <li><a href="#" @click="logout">Log out</a></li>
                </ul>
              </li>
              <li v-else>
                  <base-button link to="/login">Login</base-button>
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
    invitations() {
      return this.$store.getters.getRequests.filter(request => request.coach.id === this.userIdentity.localId).length;
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
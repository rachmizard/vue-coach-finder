<template>
  <div style="margin-top: 100px" class="center-block">
    <base-card title="Login as Coach">
      <div class="col">
        <base-alert v-if="error !== null" type="danger">
          <strong>{{ error }}</strong>
        </base-alert>
      </div>
      <login-form @save-login="saveLogin" :isLoading="isLoading"></login-form>
    </base-card>
  </div>
</template>
<script>
import LoginForm from "../../components/auth/LoginForm.vue";

import { mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  created() {
    if (this.isLoggedIn) {
      this.$router.push("/");
    }
  },
  components: {
    loginForm: LoginForm,
  },
  methods: {
    saveLogin(payload) {
      this.isLoading = true;
      this.error = null;
      const formData = {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      };
      this.$store
        .dispatch("login", formData)
        .then(() => {
          this.$store.dispatch("setUser", { forceRefresh: true });
          this.$store.dispatch("setRequests");
        })
        .then(() => {
          if (this.$route.query.redirect) {
            const redirect = this.$route.query.redirect;
            this.$router.push(redirect);
          } else {
            this.$router.push("/");
          }
          this.isLoading = false;
        })
        .catch((error) => {
            console.log(error)
          this.error = error || "Something went wrong!";
        });
    },
  },
};
</script>
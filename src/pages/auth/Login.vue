<template>
  <div style="margin-top: 100px" class="center-block">
    <base-card title="Login as Coach">
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
    async saveLogin(payload) {
      this.isLoading = true;
      const formData = {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      };
      try {
        await this.$store.dispatch("login", formData);
        await this.$store.dispatch("setUser", { forceRefresh: true });
      } catch (error) {
        console.log(error);
      }
      if (this.$route.query.redirect) {
        const redirect = this.$route.query.redirect;
        this.$router.push(redirect);
      } else {
        this.$router.push('/');
      }
      this.isLoading = false;
    },
  },
};
</script>
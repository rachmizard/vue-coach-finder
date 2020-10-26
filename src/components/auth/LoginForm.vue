<template>
  <form @submit.prevent="login" autocomplete="off">
    <div class="form-group" :class="{ 'has-error': $v.form.email.$error }">
      <label for="exampleInputEmail1">Email address</label>
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        placeholder="Email"
        v-model.trim="form.email"
      />
    </div>
    <div class="form-group" :class="{ 'has-error': $v.form.password.$error }">
      <label for="exampleInputPassword1">Password</label>
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        placeholder="Password"
        v-model.trim="form.password"
      />
    </div>
    <div class="form-group">
      <base-button link to="/register" mode="text-muted"
        >Don't have any account? Register now!</base-button
      >
    </div>
    <base-spinner v-if="isLoading" class="center-block"></base-spinner>
    <base-button mode="btn btn-default">Login</base-button>
  </form>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  emits: ["save-login"],
  props: ["isLoading"],
  data() {
    return {
      form: {
        password: null,
        email: null,
      },
    };
  },
  validations: {
    form: {
      password: { required },
      email: { required, email },
    },
  },
  methods: {
    async login() {
      this.$v.form.$touch();
      if (this.$v.form.$invalid) return;
      this.$v.form.$reset();
      this.$emit("save-login", this.form);
    },
  },
};
</script>
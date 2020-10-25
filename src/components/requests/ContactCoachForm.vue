<template>
  <form @submit.prevent="submitRegistration" autocomplete="off">
    <div class="form-group" :class="{ 'has-error': $v.form.email.$error }">
      <label for="exampleInputEmail1">Your Email address</label>
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        placeholder="Email"
        v-model.trim="form.email"
      />
    </div>
    <div class="form-group" :class="{ 'has-error': $v.form.message.$error }">
      <label for="inputMessage">Message</label>
      <textarea class="form-control" id="inputMessage" cols="30" rows="10"> </textarea>
    </div>
    <base-button mode="btn btn-default">Submit</base-button>
  </form>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  emits: ["save-registration"],
  data() {
    return {
      form: {
        email: null,
        message: null,
      },
    };
  },
  validations: {
    form: {
      email: { required, email },
      message: { required },
    },
  },
  methods: {
    submitRegistration() {
      this.$v.form.$touch();
      if (this.$v.form.$invalid) return;
      this.$v.form.$reset();
      this.$emit("save-registration", this.form);
    },
  },
};
</script>
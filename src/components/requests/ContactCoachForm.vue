<template>
  <form ref="contactCoachForm" @submit.prevent="submitContact" autocomplete="off">
    <div class="form-group" :class="{ 'has-error': $v.form.email.$error }">
      <label for="exampleInputEmail1">Your Email address</label>
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        placeholder="Email"
        v-model="form.email"
        @input="$v.form.email.$touch"
      />
    </div>
    <div class="form-group" :class="{ 'has-error': $v.form.message.$error }">
      <label for="inputMessage">Message</label>
      <textarea
        v-model="form.message"
        class="form-control"
        id="inputMessage"
        cols="30"
        rows="10"
        @input="$v.form.email.$touch"
      >
      </textarea>
    </div>
    <base-button mode="btn btn-default">Submit</base-button>
  </form>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  emits: ["save-registration"],
  props: ['coachId'],
  data() {
    return {
      form: {
        email: null,
        message: null,
        coachId: this.coachId,
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
    submitContact() {
      this.$v.form.$touch();
      if (this.$v.form.$invalid) return;
      this.$v.form.$reset();
      this.$emit("save-request", this.form);
      this.$router.replace('/coaches');
    },
  },
};
</script>
<template>
  <form @submit.prevent="submitRegistration" autocomplete="off">
    <div class="form-group" :class="{ 'has-error': $v.form.firstName.$error }">
      <label for="inputFirstName">First Name</label>
      <input
        type="text"
        class="form-control"
        id="inputFirstName"
        placeholder="First Name"
        v-model.trim="form.firstName"
      />
    </div>
    <div class="form-group" :class="{ 'has-error': $v.form.lastName.$error }">
      <label for="inputLastName">Last Name</label>
      <input
        type="text"
        class="form-control"
        id="inputLastName"
        placeholder="Last Name"
        v-model.trim="form.lastName"
      />
    </div>
    <div class="form-group" :class="{ 'has-error': $v.form.phone.$error }">
      <label for="inputPhoneNumber">Phone Number</label>
      <input
        type="text"
        class="form-control"
        id="inputPhoneNumber"
        placeholder="Phone Number"
        v-model.trim="form.phone"
      />
    </div>
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
    <div
      class="form-group"
      :class="{
        'has-error':
          $v.form.password.$error || form.password !== form.reTypePassword,
      }"
    >
      <label for="inputReTypePassword">Re-Password</label>
      <input
        type="password"
        class="form-control"
        id="inputReTypePassword"
        placeholder="Password"
        v-model.trim="form.reTypePassword"
      />
    </div>
    <div class="form-group">
      <label for="areasOfExperienceCheckbox">Areas of Experience</label>
      <div class="checkbox" id="areasOfExperienceCheckbox">
        <label class="checkbox-inline">
          <input v-model.trim="form.areas" value="frontend" type="checkbox" /> Front
          end
        </label>
        <label class="checkbox-inline">
          <input v-model.trim="form.areas" value="backend" type="checkbox" /> Back end
        </label>
        <label class="checkbox-inline">
          <input v-model.trim="form.areas" value="mobile" type="checkbox" /> Mobile Dev
        </label>
        <label class="checkbox-inline">
          <input v-model.trim="form.areas" value="ui/ux" type="checkbox" /> UI/UX
        </label>
      </div>
    </div>
    <base-spinner v-if="isLoading" class="center-block"></base-spinner>
    <base-button mode="btn btn-default">Submit</base-button>
  </form>
</template>

<script>
import { required, integer, email } from "vuelidate/lib/validators";

export default {
  emits: ["save-registration"],
  props: ["isLoading"],
  data() {
    return {
      form: {
        firstName: null,
        lastName: null,
        password: null,
        email: null,
        phone: null,
        reTypePassword: null,
        areas: []
      },
    };
  },
  validations: {
    form: {
      firstName: { required },
      lastName: { required },
      password: { required },
      email: { required, email },
      phone: { required, integer },
    },
  },
  methods: {
    async submitRegistration() {
      this.$v.form.$touch();
      if (this.$v.form.$invalid) return;
      this.$v.form.$reset();
      this.$emit("save-registration", this.form);
    },
  },
};
</script>
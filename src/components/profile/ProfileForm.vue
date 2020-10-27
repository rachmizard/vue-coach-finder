<template>
  <base-tab>
    <template #tab-list>
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active">
          <a
            href="#account"
            aria-controls="account"
            role="tab"
            data-toggle="tab"
            >Account</a
          >
        </li>
        <li role="presentation">
          <a
            href="#profile"
            aria-controls="profile"
            role="tab"
            data-toggle="tab"
            >Profile</a
          >
        </li>
        <li role="presentation">
          <a
            href="#change-pw"
            aria-controls="change-pw"
            role="tab"
            data-toggle="tab"
            >Change Password</a
          >
        </li>
      </ul>
    </template>
    <template #tab-content>
      <div role="tabpanel" class="tab-pane active" id="account">
        <div class="col" style="margin-top: 20px">
          <form @submit.prevent="saveAccount" class="form-horizontal">
            <div
              class="form-group"
              :class="{ 'has-error': $v.formAccount.firstName.$error }"
            >
              <label for="inputFirstName" class="col-sm-2 control-label"
                >First Name</label
              >
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  id="inputFirstName"
                  @input="$v.formAccount.firstName.$touch"
                  v-model="formAccount.firstName"
                />
              </div>
            </div>
            <div
              class="form-group"
              :class="{ 'has-error': $v.formAccount.lastName.$error }"
            >
              <label for="inputLastName" class="col-sm-2 control-label"
                >Last Name</label
              >
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  id="inputLastName"
                  @input="$v.formAccount.lastName.$touch"
                  v-model="formAccount.lastName"
                />
              </div>
            </div>
            <div
              class="form-group"
              :class="{ 'has-error': $v.formAccount.email.$error }"
            >
              <label for="inputEmail3" class="col-sm-2 control-label"
                >Email</label
              >
              <div class="col-sm-10">
                <input
                  type="email"
                  class="form-control"
                  id="inputEmail3"
                  @input="$v.formAccount.email.$touch"
                  v-model="formAccount.email"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
                <base-button type="submit" mode="btn btn-default"
                  >Save Account</base-button
                >
              </div>
            </div>
          </form>
        </div>
      </div>
      <div role="tabpanel" class="tab-pane" id="profile">
        <div class="col" style="margin-top: 20px">
          <form @submit.prevent="saveProfile" class="form-horizontal">
            <div class="form-group">
              <label for="inputHourlyRate" class="col-sm-2 control-label"
                >Hourly Rate $</label
              >
              <div class="col-sm-10">
                <input
                  type="number"
                  class="form-control"
                  id="inputHourlyRate"
                  v-model="formProfile.hourlyRate"
                />
              </div>
            </div>
            <div
              class="form-group"
              :class="{ 'has-error': $v.formProfile.areas.$error }"
            >
              <div class="row">
                <div class="col-md-3">
                  <div style="margin-left: 20px">
                    <label for="areasOfExperienceCheckbox">Experience</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="checkbox" id="areasOfExperienceCheckbox">
                    <label class="checkbox-inline as">
                      <input
                        v-model.trim="formProfile.areas"
                        value="frontend"
                        type="checkbox"
                      />
                      Front end
                    </label>
                    <label class="checkbox-inline">
                      <input
                        v-model.trim="formProfile.areas"
                        value="backend"
                        type="checkbox"
                      />
                      Back end
                    </label>
                    <label class="checkbox-inline">
                      <input
                        v-model.trim="formProfile.areas"
                        value="mobile"
                        type="checkbox"
                      />
                      Mobile Dev
                    </label>
                    <label class="checkbox-inline">
                      <input
                        v-model.trim="formProfile.areas"
                        value="ui/ux"
                        type="checkbox"
                      />
                      UI/UX
                    </label>
                  </div>
                  <p v-if="errorValidationAreas !== null" class="text-danger">
                    {{ errorValidationAreas }}
                  </p>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
                <base-button type="submit" mode="btn btn-default"
                  >Save Account</base-button
                >
              </div>
            </div>
          </form>
        </div>
      </div>
      <div role="tabpanel" class="tab-pane" id="change-pw">
        <div class="col" style="margin-top: 20px">
          <form @submit.prevent="saveChangePw" class="form-horizontal">
            <div
              class="form-group"
              :class="{ 'has-error': $v.formChangePassword.password.$error }"
            >
              <label for="inputPassword3" class="col-sm-2 control-label"
                >Password</label
              >
              <div class="col-sm-10">
                <input
                  type="password"
                  class="form-control"
                  id="inputPassword3"
                  placeholder="Password"
                  @input="$v.formChangePassword.password.$touch"
                  v-model="formChangePassword.password"
                />
              </div>
            </div>
            <div
              class="form-group"
              :class="{
                'has-error': $v.formChangePassword.reTypePassword.$error,
              }"
            >
              <label for="inputRePw" class="col-sm-2 control-label"
                >Re type Password</label
              >
              <div class="col-sm-10">
                <input
                  type="password"
                  class="form-control"
                  id="inputRePw"
                  placeholder="Password"
                  @input="$v.formChangePassword.reTypePassword.$touch"
                  v-model="formChangePassword.reTypePassword"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
                <base-button type="submit" mode="btn btn-default"
                  >Save Password</base-button
                >
              </div>
            </div>
          </form>
        </div>
      </div>
    </template>
  </base-tab>
</template>

<script>
import { required, integer, email } from "vuelidate/lib/validators";

export default {
  props: {
    user: Object,
  },
  data() {
    return {
      errorValidationAreas: null,
      formAccount: {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        phone: this.user.email,
      },
      formProfile: {
        areas: this.user.areas,
        hourlyRate: this.user.hourlyRate,
      },
      formChangePassword: {
        password: "",
        reTypePassword: "",
      },
    };
  },
  validations: {
    formAccount: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      phone: { required, integer },
    },
    formProfile: {
      areas: { required },
      hourlyRate: {},
    },
    formChangePassword: {
      password: { required },
      reTypePassword: { required },
    },
  },
  methods: {
    saveAccount() {
      this.$v.formAccount.$touch();
      if (this.$v.formAccount.$invalid) return;
    },
    saveProfile() {
      this.$v.formProfile.$touch();
      this.errorValidationAreas = null;
      if (this.$v.formProfile.$invalid) return;
      if (!this.formProfile.areas.length > 0) {
        this.errorValidationAreas = "Select your experience at least one!";
        return;
      }
    },
    saveChangePw() {
      this.$v.formChangePassword.$touch();
      if (this.$v.formChangePassword.$invalid) return;
    },
  },
};
</script>
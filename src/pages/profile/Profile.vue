<template>
  <div class="container">
    <base-alert v-if="error" type="danger">
      <strong>{{ error }}</strong>
    </base-alert>
    <div class="row">
      <div class="col-md-4">
        <base-card title="Profile Picture">
          <base-spinner class="center-block" v-if="isLoading"></base-spinner>
          <base-thumbnail
            v-if="isLoggedIn && user"
            :photoUrl="user.photoUrl"
          ></base-thumbnail>
        </base-card>
      </div>
      <div class="col-md-8">
        <base-card title="Form">
          <base-spinner class="center-block" v-if="isLoading"> </base-spinner>
          <profile-form
            v-if="isLoggedIn && user"
            :user="user"
            @save-changes="saveChanges"
          ></profile-form>
        </base-card>
      </div>
    </div>
  </div>
</template>
<script>
import ProfileForm from "../../components/profile/ProfileForm.vue";

export default {
  name: "Profile",
  components: {
    profileForm: ProfileForm,
  },
  created() {
    this.loadCoach();
  },
  data() {
    return {
      error: null,
      isLoading: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters.getCoach;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    userId() {
      return this.$store.getters.getAuthUser.localId;
    },
  },
  methods: {
    async loadCoach() {
      this.error = null;
      this.isLoading = true;
      await this.$store.dispatch("getDetailCoach", this.userId).catch((err) => {
        this.error = err;
      });
      this.isLoading = false;
    },
    saveChanges() {},
  },
};
</script>
<template>
  <div class="center-block">
    <base-card title="Coach Registrastion Form">
      <coach-form-registration
        @save-registration="saveRegistration"
        :isLoading="isLoading"
      ></coach-form-registration>
    </base-card>
  </div>
</template>
<script>
import CoachFormRegistration from "../../components/coaches/CoachFormRegistration.vue";

export default {
  name: "CoachRegister",
  data() {
    return {
      isLoading: false
    }
  },
  components: {
    coachFormRegistration: CoachFormRegistration,
  },
  methods: {
    async saveRegistration(payload) {
      this.isLoading = true;
      await this.$store.dispatch('registerCoach', payload);
      this.$router.push('/coaches')
      this.isLoading = false
    },
  },
};
</script>
<template>
  <div class="center-block">
    <base-card title="Coach Registrastion Form">
      <coach-form-registration
        @save-registration="saveRegistration"
      ></coach-form-registration>
    </base-card>
  </div>
</template>
<script>
import CoachFormRegistration from "../../components/coaches/CoachFormRegistration.vue";

export default {
  name: "CoachRegister",
  components: {
    coachFormRegistration: CoachFormRegistration,
  },
  methods: {
    saveRegistration(payload) {
      this.$store.dispatch('registerCoach', payload);
      this.$router.replace('/coaches')
    },
  },
};
</script>
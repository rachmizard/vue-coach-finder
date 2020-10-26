<template>
  <div id="contactForm">
    <contact-coach-form
      @save-request="saveContact"
      :coachId="id"
      :user="user"
    ></contact-coach-form>
  </div>
</template>
<script>
import ContactCoachForm from "../../components/requests/ContactCoachForm.vue";

export default {
  props: ["id"],
  name: "ContactCoach",
  components: {
    contactCoachForm: ContactCoachForm,
  },
  created() {
    if (this.findRequests) {
      this.$router.go(-1);
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    user() {
      return this.$store.getters.getAuthUser;
    },
    getCoach() {
      const data = this.$store.getters.getCoaches.find(
        (coach) => coach.id === this.id
      );
      return data;
    },
    findRequests() {
      return this.$store.getters.getRequests.find(
        (req) => req.coach.id === this.id
      )
        ? true
        : false;
    },
  },
  methods: {
    saveContact(payload) {
      const data = {
        email: payload.email,
        message: payload.message,
        coach: this.getCoach,
      };
      this.$store.dispatch("contactCoach", data);
    },
  },
};
</script>
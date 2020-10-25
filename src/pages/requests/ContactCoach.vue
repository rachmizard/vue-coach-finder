<template>
  <div id="contactForm">
    <contact-coach-form @save-request="saveContact" :coachId="id"></contact-coach-form>
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
  computed: {
    getCoach() {
      const data = this.$store.getters.getCoaches.find(
        (coach) => coach.id === this.id
      );
      return data;
    },
  },
  methods: {
    saveContact(payload) {
        const data = {
            email: payload.email,
            message: payload.message,
            coach: this.getCoach        
        }
        this.$store.dispatch('contactCoach', data)
    },
  },
};
</script>
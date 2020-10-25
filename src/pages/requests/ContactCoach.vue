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
  methods: {
    saveContact(payload) {
        this.$store.dispatch('contactCoach', payload)
    },
  },
};
</script>
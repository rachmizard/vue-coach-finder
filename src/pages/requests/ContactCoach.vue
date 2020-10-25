<template>
    <contact-coach-form></contact-coach-form>
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
    saveContact() {},
  },
};
</script>
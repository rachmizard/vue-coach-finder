<template>
  <div class="text-center">
    Are you sure?
    <button class="btn btn-sm btn-default" @click="payment">Yes</button>
  </div>
</template>
<script>
export default {
  props: ["id"],
  name: "VerifyPayment",
  computed: {
      coach() {
          return this.$store.getters.getRequests
      }
  },
  methods: {
    payment() {
        this.$store.dispatch('updateRequest')
    },
  },
};
</script>
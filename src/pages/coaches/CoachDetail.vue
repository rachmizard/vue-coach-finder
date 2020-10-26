<template>
    <base-card class="center-block" :title="title">
      <base-spinner class="center-block" v-if="isLoading"></base-spinner>
      <base-thumbnail v-if="coach" :photoUrl="photoUrl">
        <h3 class="text-center">{{ fullName }}</h3>
        <p class="text-center">{{ coach.description }}</p>
        <p class="text-center">{{ coach.phone }}</p>
        <p class="text-center">{{ coach.email }}</p>
        <p class="text-center">
          <strong>Hourly Rate</strong> {{ coach.hourlyRate | currency }}
        </p>
        <p class="text-center">
          <base-button
            v-if="!coach.isPaid && findRequests"
            link
            :to="redirectPayment"
            mode="btn btn-warning"
            >Pay Now</base-button
          >
        </p>
        <base-badge v-for="(area, index) in coach.areas" :key="index">
          {{ area }}
        </base-badge>
        <p v-if="!findRequests" class="text-info">Interest? Contact now!</p>
        <base-button
          v-if="!findRequests"
          v-scroll-to="'#contactForm'"
          mode="btn btn-primary"
          link
          :to="redirectCoachContact"
          >Contact</base-button
        >
        <router-view></router-view>
      </base-thumbnail>
    </base-card>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      isLoading: false,
    };
  },
  created() {
    this.loadCoach();
  },
  computed: {
    coach() {
      return this.$store.getters.getCoach;
    },
    photoUrl() {
      return this.$store.getters.getCoach
        ? this.$store.getters.getCoach.photoUrl
        : "../../assets/logo.png";
    },
    fullName() {
      return this.coach.firstName + " " + this.coach.lastName;
    },
    title() {
      return "Coach Detail";
    },
    redirectCoachContact() {
      return "/coaches/" + this.coach.id + "/contact";
    },
    redirectPayment() {
      return "/coaches/" + this.coach.id + "/payment";
    },
    findRequests() {
      return this.$store.getters.getRequests.find(
        (req) => req.coach.id === this.coach.id
      )
        ? true
        : false;
    },
  },
  methods: {
    async loadCoach() {
      this.isLoading = true;
      await this.$store.dispatch("getDetailCoach", this.id);
      this.isLoading = false;
    },
  },
};
</script>
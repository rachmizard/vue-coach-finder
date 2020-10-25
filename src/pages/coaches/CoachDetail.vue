<template>
  <div class="center-block">
    <base-card :title="title">
      <base-thumbnail :photoUrl="coach.photoUrl">
        <h3 class="text-center">{{ fullName }}</h3>
        <p class="text-center">{{ coach.description }}</p>
        <p class="text-center">{{ coach.phone }}</p>
        <p class="text-center">{{ coach.email }}</p>
        <p class="text-center">
          <strong>Hourly Rate</strong> {{ coach.hourlyRate | currency }}
        </p>
        <base-badge v-for="(area, index) in coach.areas" :key="index">
          {{ area }}
        </base-badge>
        <p v-if="!findRequests" class="text-info">Interest? Contact now!</p>
        <p>
          <base-button v-if="!findRequests" v-scroll-to="'#contactForm'" mode="btn btn-primary" link :to="redirectCoachContact"
            >Contact</base-button
          >
        </p>
        <router-view></router-view>
      </base-thumbnail>
    </base-card>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      coach: null,
    };
  },
  computed: {
    fullName() {
      return this.coach.firstName + " " + this.coach.lastName;
    },
    title() {
      return "Coach Detail";
    },
    redirectCoachContact() {
      return "/coaches/" + this.coach.id + "/contact";
    },
    findRequests() {
      return this.$store.getters.getRequests.find(req => req.coach.id === this.coach.id) ? true : false;
    }
  },
  created() {
    this.coach = this.$store.getters.getCoaches.find(
      (coach) => coach.id === this.id
    );
    if (!this.coach) {
      this.$router.replace("/coaches");
    }
  },
};
</script>
<template>
  <div class="col-md-5">
    <ul class="list-group">
      <li class="list-group-item">
        <div class="center-block">
          <img
            class="img-thumbnail"
            width="100"
            height="100"
            :src="coach.photoUrl"
            alt=""
          />
        </div>
      </li>
      <li class="list-group-item">
        <strong>Full Name : </strong> {{ fullName }}
      </li>
      <li class="list-group-item">
        <strong>Hourly Rate : </strong>{{ coach.hourlyRate | currency }}
      </li>
      <li class="list-group-item" style="height: 100px">
        <div class="row">
          <base-badge v-for="(area, index) in coach.areas" :key="index">
            {{ area }}
          </base-badge>
        </div>
      </li>
      <li class="list-group-item">
        <div class="btn-group" role="group" aria-label="...">
          <base-button
            mode="btn btn-warning"
            to="/"
            v-if="!coach.isPaid && findRequests"
            >Pay Now</base-button
          >
          <base-button
            mode="btn btn-primary"
            link
            :to="redirectCoachContact"
            v-else
            >Contact</base-button
          >
          <base-button mode="btn btn-info" link :to="viewDetail"
            >View Detail</base-button
          >
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["coach"],
  computed: {
    fullName() {
      return this.coach.firstName + " " + this.coach.lastName;
    },
    viewDetail() {
      return "/coaches/" + this.coach.id;
    },
    redirectCoachContact() {
      return "/coaches/" + this.coach.id + "/contact";
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    user() {
      return this.$store.getters.getAuthUser;
    },
    findRequests() {
      return this.$store.getters.getRequests.find(
        (req) =>
          this.isLoggedIn &&
          req.coach.id === this.coach.id &&
          req.userId === this.user.localId
      )
        ? true
        : false;
    },
  },
};
</script>
 
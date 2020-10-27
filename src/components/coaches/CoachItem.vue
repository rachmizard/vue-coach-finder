<template>
  <div class="col-md-5">
    <div class="panel panel-warning">
      <div class="panel-heading">
        <p class="text-center">
          <img
            class="img-circle"
            width="120"
            height="120"
            :src="coach.photoUrl"
            alt=""
          />
        </p>
      </div>
      <div class="panel-body">
        <h4 class="text-center"><strong>{{ fullName }}</strong></h4>
      </div>
      <div class="panel-footer">
        <div class="row">
          <div class="col-md-5">
            <p>
              <strong>Hourly Rate : </strong>{{ coach.hourlyRate | currency }}
            </p>
          </div>
          <div class="col-md-5">
            <base-badge v-for="(area, index) in coach.areas" :key="index">
              {{ area }}
            </base-badge>
          </div>
        </div>
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
      </div>
    </div>
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
 
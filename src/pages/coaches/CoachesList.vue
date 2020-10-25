<template>
  <div class="row">
    <div class="col-md-2">
      <base-card title="Filter">
        <base-button mode="btn btn-sm btn-info">Refresh</base-button>
      </base-card>
    </div>
    <div class="col-md-10">
      <div class="row">
        <coach-item
          v-for="(coach, index) in coaches"
          :key="index"
          :coach="coach"
        ></coach-item>
      </div>
    </div>
  </div>
</template>

<script>
import CoachItem from "./../../components/coaches/CoachItem.vue";

export default {
  name: "CoachesList",
  components: {
    coachItem: CoachItem,
  },
  computed: {
    coaches() {
      return this.$store.getters.getCoaches;
    },
  },
};
</script>
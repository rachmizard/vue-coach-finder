<template>
  <div class="row">
    <div class="col-md-2">
      <coach-filter
        @refresh-coaches="loadCoaches"
        @change-filter="setFilters"
      ></coach-filter>
    </div>
    <div class="col-md-10">
      <div v-if="isLoading" style="margin: 20px 20px;">
        <base-spinner></base-spinner>
      </div>
      <div class="row" v-if="coaches.length > 0">
        <coach-item
          v-for="(coach, index) in coaches"
          :key="index"
          :coach="coach"
        ></coach-item>
      </div>
      <div class="row" v-else>
        <p class="text-muted text-center">Data is not found.</p>
      </div>
    </div>
  </div>
</template>

<script>
import CoachItem from "./../../components/coaches/CoachItem.vue";
import CoachFilter from "./../../components/coaches/CoachFilter.vue";

export default {
  name: "CoachesList",
  data() {
    return {
      isLoading: false,
      activeFilters: {
        frontend: true,
        backend: true,
        uiux: true,
        sa: true,
        mobile: true,
        search: null,
      },
    };
  },
  components: {
    coachItem: CoachItem,
    coachFilter: CoachFilter,
  },
  created() {
    this.loadCoaches();
  },
  computed: {
    coaches() {
      const data = this.$store.getters.getCoaches;
      return data.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.mobile && coach.areas.includes("mobile")) {
          return true;
        }
        if (this.activeFilters.uiux && coach.areas.includes("ui/ux")) {
          return true;
        }
        if (this.activeFilters.sa && coach.areas.includes("system analyst")) {
          return true;
        }
        if (
          this.activeFilters.search !== "" &&
          (coach.firstName.includes(this.activeFilters.search) ||
            coach.lastName.includes(this.activeFilters.search))
        ) {
          return true;
        }
        return false;
      });
    },
  },
  methods: {
    setFilters(updatedFilters) {
      this.loadCoaches();
      this.activeFilters = updatedFilters;
    },
    async loadCoaches() {
      this.isLoading = true;
      await this.$store.dispatch("setCoaches");
      this.isLoading = false;
    },
  },
};
</script>
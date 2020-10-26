<template>
  <div class="container">
    <div class="col">
      <base-alert v-if="error !== null" type="danger">
        <strong>{{ error }}</strong>
      </base-alert>
    </div>
    <div class="row">
      <div class="col-md-2">
        <coach-filter
          @refresh-coaches="loadCoaches"
          @change-filter="setFilters"
        ></coach-filter>
      </div>
      <div class="col-md-10">
        <div v-if="isLoading" style="margin: 20px 20px">
          <base-spinner class="center-block"></base-spinner>
        </div>
        <div class="row" v-if="coaches.length > 0">
          <coach-item
            v-for="(coach, index) in coaches"
            :key="index"
            :coach="coach"
          ></coach-item>
        </div>
        <div class="row" v-else-if="coaches.length === 0 && !isLoading">
          <p class="text-muted text-center">Data is not found.</p>
        </div>
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
      error: null,
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
    user() {
      return this.$store.getters.getAuthUser;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    coaches() {
      const data = this.$store.getters.getCoaches;
      return data.filter((coach) => {
        if (this.isLoggedIn && coach.id === this.user.localId) {
          return false;
        }
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
    async loadCoaches(forceRefresh = false) {
      this.isLoading = true;
      this.error = null;
      try {
        await this.$store.dispatch("setCoaches", {
          forceRefresh: forceRefresh,
        });
      } catch (error) {
        this.error = error || "Something went wrong!";
      }
      this.isLoading = false;
    },
  },
};
</script>
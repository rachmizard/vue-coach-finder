<template>
  <base-card title="Filter">
    <div class="checkbox">
      <label>
        <input id="frontend" type="checkbox" checked @change="setFilter" /> Frontend
      </label>
    </div>
    <div class="checkbox">
      <label>
        <input id="backend" type="checkbox" checked @change="setFilter" /> Backend
      </label>
    </div>
    <div class="checkbox">
      <label>
        <input id="uiux" type="checkbox" checked @change="setFilter" /> UI/UX
      </label>
    </div>
    <div class="checkbox">
      <label>
        <input id="mobile" type="checkbox" checked @change="setFilter" /> Mobile
      </label>
    </div>
    <div class="checkbox">
      <label>
        <input id="sa" type="checkbox" checked @change="setFilter" /> System Analyst
      </label>
    </div>
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        v-model="filters.search"
        placeholder="Search first name & last name"
        @keyup="setFilter"
      />
    </div>
    <div v-if="isLoading" class="progress">
      <div
        class="progress-bar progress-bar-striped active"
        role="progressbar"
        aria-valuenow="45"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{ width: percentage }"
      >
        <span class="sr-only">45% Complete</span>
      </div>
    </div>
  </base-card>
</template>
<script>
export default {
  emits: ["change-filter"],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        uiux: true,
        sa: true,
        mobile: true,
        search: null,
      },
      isLoading: false,
      percentage: '45%'
    };
  },
  methods: {
    setFilter(event) {
      this.isLoading = true;
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive,
      };

      this.filters = updatedFilters;
      this.percentage = '100%';
      setTimeout(() => {
        this.$emit("change-filter", updatedFilters);
        this.isLoading = false;
      }, 500);
    },
  },
};
</script>
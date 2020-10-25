<template>
  <base-card title="Filter" icon="glyphicon glyphicon-search">
    <button @click="refreshCoaches" class="btn btn-sm btn-info"
      >Refresh
      <span class="glyphicon glyphicon-refresh" aria-hidden="true"></span>
    </button>
    <div class="checkbox">
      <label>
        <input id="frontend" type="checkbox" checked @change="setFilter" />
        Frontend
      </label>
    </div>
    <div class="checkbox">
      <label>
        <input id="backend" type="checkbox" checked @change="setFilter" />
        Backend
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
        <input id="sa" type="checkbox" checked @change="setFilter" /> System
        Analyst
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
  </base-card>
</template>
<script>
export default {
  emits: ["change-filter", "refresh-coaches"],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        uiux: true,
        sa: true,
        mobile: true,
        search: null,
      }
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
      setTimeout(() => {
        this.$emit("change-filter", updatedFilters);
      }, 500);
    },
    refreshCoaches() {
      this.$emit("refresh-coaches", true);
    }
  },
};
</script>
<template>
    <base-card title="Filter">
        <div class="checkbox">
            <label>
            <input id="frontend" type="checkbox" @change="setFilter"> Frontend
            </label>
        </div>
        <div class="checkbox">
            <label>
            <input id="backend" type="checkbox" @change="setFilter"> Backend
            </label>
        </div>
        <div class="checkbox">
            <label>
            <input id="uiux" type="checkbox" @change="setFilter"> UI/UX
            </label>
        </div>
        <div class="checkbox">
            <label>
            <input id="mobile" type="checkbox" @change="setFilter"> Mobile
            </label>
        </div>
        <div class="checkbox">
            <label>
            <input id="sa" type="checkbox" @change="setFilter"> System Analyst
            </label>
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Search..">
        </div>
    </base-card>
</template>
<script>
export default {
    emits: ['change-filter'],
    data() {
        return {
            filters: {
                frontend: false,
                backend: false,
                uiux: false,
                sa: false,
                mobile: false,
            }
        }
    },
    methods: {
        setFilter(event) {
            const inputId = event.target.id
            const isActive = event.target.checked;
            const updatedFilters = {
                ...this.filters,
                [inputId]: isActive
            }  

            this.filters = updatedFilters;
            this.$emit('change-filter', updatedFilters);
        }
    }
}
</script>
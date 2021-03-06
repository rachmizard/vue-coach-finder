import Vue from 'vue';
import BaseCard from './../ui/BaseCard.vue';
import BaseButton from './../ui/BaseButton.vue';
import BaseBadge from './../ui/BaseBadge.vue';
import BaseThumbnail from './../ui/BaseThumbnail.vue';
import BaseTable from './../ui/BaseTable.vue';
import BaseSpinner from './../ui/BaseSpinner.vue';
import BaseAlert from './../ui/BaseAlert.vue';
import BaseTab from './../ui/BaseTab.vue'

const baseComponent = {
    baseCard: Vue.component('base-card', BaseCard),
    baseButton: Vue.component('base-button', BaseButton),
    baseBadge: Vue.component('base-badge', BaseBadge),
    baseThumbnail: Vue.component('base-thumbnail', BaseThumbnail),
    baseTable: Vue.component('base-table', BaseTable),
    baseSpinner: Vue.component('base-spinner', BaseSpinner),
    baseAlert: Vue.component('base-alert', BaseAlert),
    baseTab: Vue.component('base-tab', BaseTab),
}

export default baseComponent;

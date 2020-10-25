import Vue from 'vue';
import BaseCard from './../ui/BaseCard.vue';
import BaseButton from './../ui/BaseButton.vue';
import BaseBadge from './../ui/BaseBadge.vue';
import BaseThumbnail from './../ui/BaseThumbnail.vue';

const baseComponent = {
    baseCard: Vue.component('base-card', BaseCard),
    baseButton: Vue.component('base-button', BaseButton),
    baseBadge: Vue.component('base-badge', BaseBadge),
    baseThumbnail: Vue.component('base-thumbnail', BaseThumbnail)
}

export default baseComponent;
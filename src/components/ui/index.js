import Vue from 'vue';
import BaseCard from './../ui/BaseCard.vue';
import BaseButton from './../ui/BaseButton.vue';

const baseComponent = {
    baseCard: Vue.component('base-card', BaseCard),
    baseButton: Vue.component('base-button', BaseButton)
}

export default baseComponent;
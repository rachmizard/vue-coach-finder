import Vue from 'vue'
import VueRouter from 'vue-router'

import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegister from './pages/coaches/CoachRegister.vue';

import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';

Vue.use(VueRouter);

const routes = [
        {
            path: '/',
            redirect: '/coaches'
        },
        {
            path: '/coaches',
            component: CoachesList
        },
        {
            path: '/coaches/:id',
            component: CoachDetail,
            props: true,
            children: [
                {
                    path: 'contact',
                    component: ContactCoach,
                    props: true
                }
            ]
        },
        {
            path: '/register',
            component: CoachRegister
        },
        {
            path: '/requests',
            component: RequestsReceived
        },
        {
            path: '/:notFound(.*)',
            component: null
        }
    ];

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
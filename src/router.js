import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
        {
            path: '/',
            redirect: '/coaches'
        },
        {
            path: '/coaches',
            component: () => import('./pages/coaches/CoachesList.vue')
        },
        {
            path: '/coaches/:id',
            component: () => import('./pages/coaches/CoachDetail.vue'),
            props: true,
            children: [
                {
                    path: 'contact',
                    component: () => import('./pages/requests/ContactCoach.vue'),
                    props: true
                },
                {
                    path: 'payment',
                    component: () => import('./pages/requests/VerifyPayment.vue'),
                    props: true
                }
            ]
        },
        {
            path: '/register',
            component: () => import('./pages/coaches/CoachRegister.vue')
        },
        {
            path: '/requests',
            component: () => import('./pages/requests/RequestsReceived.vue')
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
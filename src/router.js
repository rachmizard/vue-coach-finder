import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/coaches'
    },
    {
        path: '/coaches',
        component: () => import('./pages/coaches/CoachesList.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/coaches/:id',
        component: () => import('./pages/coaches/CoachDetail.vue'),
        props: true,
        meta: { requiresAuth: true },
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
        path: '/login',
        component: () => import('./pages/auth/Login.vue')
    },
    {
        path: '/requests',
        component: () => import('./pages/requests/RequestsReceived.vue'),
        meta: { requiresAuth: true }
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

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.getters.isLoggedIn) {
            next({
                path: '/login'
            })
        } else {
            next()
        }
    } else {
        if (store.getters.isLoggedIn) {
            next({
                path: '/'
            })
        }
        next() // make sure to always call next()!
    }
})

export default router
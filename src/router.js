import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store';

import NotFound from './pages/NotFound.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/coaches'
    },
    {
        path: '/coaches',
        component: () => import('./pages/coaches/CoachesList.vue'),
    },
    {
        path: '/coaches/:id',
        component: () => import('./pages/coaches/CoachDetail.vue'),
        props: true,
        children: [
            {
                path: 'contact',
                component: () => import('./pages/requests/ContactCoach.vue'),
                props: true,
                meta: { requiresAuth: true },
            },
            {
                path: 'payment',
                component: () => import('./pages/requests/VerifyPayment.vue'),
                props: true,
                meta: { requiresAuth: true },
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
        path: '/profile',
        component: () => import('./pages/profile/Profile.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/requests',
        component: () => import('./pages/requests/RequestsReceived.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/:notFound(.*)',
        component: NotFound
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
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
})

export default router
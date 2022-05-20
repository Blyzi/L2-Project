import { createRouter, createWebHistory } from 'vue-router'
import { $axios } from '../config/axios'
import cookie from 'cookie'
const routes = [
    {
        path: '/login',
        name: 'login',
        component: () =>
            import(
                /* webpackChunkName: "Login" */ '@/views/Login/LoginPage.vue'
            ),
    },
    {
        path: '/register',
        component: () =>
            import(
                /* webpackChunkName: "Login" */ '@/views/Login/RegisterPage.vue'
            ),
    },
    {
        path: '/calendar',
        component: () =>
            import(
                /* webpackChunkName: "Calendar" */ '@/views/CalendarPage.vue'
            ),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/',
        component: () =>
            import(
                /* webpackChunkName: "Calendar" */ '@/views/CalendarPage.vue'
            ),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from) => {
    console.log('➡️', to, from, 'Protected:', to.meta.requiresAuth)

    if (to.meta.requiresAuth) {
        const cookies = cookie.parse(document.cookie)
        if (
            cookies.accessTokenExpirationTime < Date.now() &&
            cookies.refreshTokenExpirationTime > Date.now()
        ) {
            await $axios.post('/auth/refresh')
        } else if (cookies.accessTokenExpirationTime > Date.now()) {
            router.push('/login')
        }
    }
})

export default router

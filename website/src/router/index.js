import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

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
        path: '/users',
        component: () =>
            import(/* webpackChunkName: "Users" */ '@/views/UsersPage.vue'),
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
        meta: {
            requiresAuth: true,
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from) => {
    const authStore = useAuthStore()

    console.log(
        'Router 🛣️',
        from.path,
        '->',
        to.path,
        '\nProtected:',
        to.meta.requiresAuth,
        '\nLogged in:',
        await authStore.isLoggedIn
    )

    if (to.meta.requiresAuth && !(await authStore.isLoggedIn())) {
        return { name: 'login' }
    }

    if (to.path === '/login') {
        await authStore.logout()
    }

    return true
})

export default router

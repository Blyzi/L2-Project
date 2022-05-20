import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () =>
            import(
                /* webpackChunkName: "Home" */ '@/views/Login/LoginPage.vue'
            ),
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import(
                /* webpackChunkName: "Home" */ '@/views/Login/LoginPage.vue'
            ),
    },
    {
        path: '/register',
        component: () =>
            import(
                /* webpackChunkName: "Home" */ '@/views/Login/RegisterPage.vue'
            ),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router

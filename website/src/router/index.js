import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () =>
            import(/* webpackChunkName: "Home" */ '../views/LoginPage.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router

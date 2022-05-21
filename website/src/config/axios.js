import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const router = useRouter()

const $axios = axios.create({
    baseURL: 'http://localhost:5000/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    requiresAuth: true,
})

$axios.interceptors.request.use((config) => {
    if (config.requiresAuth && !useAuthStore().isLoggedIn()) {
        router.push('/login')
        return false
    }
    return config
})

$axios.interceptors.response.use(
    (response) => {
        console.log('📸', response)
        return response
    },
    (error) => {
        console.log('😬', error)
        if (error.response.status === 403) {
            router.push('/login')
        }
        return Promise.reject(error)
    }
)

export { $axios }

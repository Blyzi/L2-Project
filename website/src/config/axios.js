import axios from 'axios'
import { useRouter } from 'vue-router'
import cookie from 'cookie'

const router = useRouter()

const $axios = axios.create({
    baseURL: 'http://localhost:5000/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

$axios.interceptors.request.use(
    (config) => {
        const cookies = cookie.parse(document.cookie)
        if (
            cookies.accessTokenExpirationTime < Date.now() &&
            cookies.refreshTokenExpirationTime > Date.now()
        ) {
            return $axios.post('/auth/refresh')
        } else if (cookies.accessTokenExpirationTime > Date.now()) {
            router.push('/login')
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

$axios.interceptors.response.use(
    (response) => {
        console.log('📸', response)
        return response
    },
    (error) => {
        console.log('😬', err)
        if (error.response.status === 401) {
            router.push('/login')
        }
        console.log(error)
        return Promise.reject(error)
    }
)

export { $axios }

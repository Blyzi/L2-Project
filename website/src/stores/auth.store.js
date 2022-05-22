import { defineStore } from 'pinia'
import { $axios } from '@/config/axios'
import * as dayjs from 'dayjs'
import cookie from 'cookie'

export const useAuthStore = defineStore('auth', {
    state: () => {
        return { user: null }
    },
    actions: {
        async login(mail, password) {
            return await $axios
                .post(
                    '/auth/login',
                    {
                        mail,
                        password,
                    },
                    { requiresAuth: false }
                )
                .then(({ data }) => {
                    this.user = data
                    return true
                })
                .catch(() => {
                    return false
                })
        },
        async refreshToken() {
            await $axios.post('/auth/refresh', {}, { requiresAuth: false })
        },
        async logout() {
            await $axios
                .post('/auth/logout', {}, { requiresAuth: false })
                .then(() => {
                    this.user = null
                })
        },
        async isLoggedIn() {
            const cookies = cookie.parse(document.cookie)
            const now = dayjs().unix()
            if (
                typeof cookies.accessTokenExpirationTime === 'undefined' ||
                typeof cookies.refreshTokenExpirationTime === 'undefined'
            ) {
                return false
            }

            if (
                cookies.accessTokenExpirationTime < now &&
                cookies.refreshTokenExpirationTime > now
            ) {
                await this.refreshToken()
                return true
            } else if (cookies.accessTokenExpirationTime < now) {
                return false
            }

            return true
        },
    },
    getters: {},
})

import { defineStore } from 'pinia'
import { $axios } from '@/config/axios'

export const useUserStore = defineStore('user', {
    state: () => {
        return { user: null, users: [] }
    },
    actions: {
        async login(mail, password) {
            return await $axios
                .post('/auth/login', {
                    mail,
                    password,
                })
                .then(({ data }) => {
                    this.user = { user: data }
                    return true
                })
                .catch(() => {
                    return false
                })
        },
        async logout() {
            return await $axios.post('/auth/logout').then(() => {
                this.user = null
            })
        },
    },
    getters: {
        isLoggedIn(state) {
            return state.user !== null
        },
    },
})

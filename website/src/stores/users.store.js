import { defineStore } from 'pinia'
import { $axios } from '@/config/axios'

export const useUserStore = defineStore('user', {
    state: () => {
        return { users: [] }
    },
    actions: {
        async getUser() {
            await $axios.get('/user').then(({ data }) => (this.users = data))
        },
    },
})

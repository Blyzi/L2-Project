import { defineStore } from 'pinia'
import { $axios } from '@/config/axios'

export const useEventStore = defineStore('event', {
    state: () => {
        return { events: [] }
    },
    actions: {
        async getEvents() {
            await $axios.get('/event').then(({ data }) => (this.events = data))
        },
    },
    getters: {
        eventParse: (state) => {
            return state.events.map((event) => {
                event.class = `!bg-${event.color}-200`
                return event
            })
        },
    },
})

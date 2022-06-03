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
        async createEvent(event) {
            await $axios.post('/event', event).then(({ data }) => {
                this.events.push(data)
            })
        },
        async deleteEvent(eventid) {
            await $axios
                .delete(`/event/${eventid}`)
                .then(
                    () =>
                        (this.events = this.events.filter(
                            (event) => event.eventId !== eventid
                        ))
                )
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

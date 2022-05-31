import { defineStore } from 'pinia'
import { $axios } from '@/config/axios'

export const useClientStore = defineStore('client', {
    state: () => {
        return { clients: [] }
    },
    actions: {
        async getClients() {
            await $axios
                .get('/client')
                .then(({ data }) => (this.clients = data))
        },
        async createClient(client) {
            await $axios.post('/client', client).then(({ data }) => {
                this.clients.push(data)
            })
        },
        async updateClient(clientid, client) {
            await $axios
                .patch(`/client/${clientid}`, client)
                .then(({ data }) => {
                    Object.assign(
                        this.clients.find(
                            (client) => client.peopleId === clientid
                        ),
                        data
                    )
                })
        },
        async deleteClient(clientid) {
            await $axios
                .delete(`/client/${clientid}`)
                .then(
                    () =>
                        (this.clients = this.clients.filter(
                            (client) => client.peopleId !== clientid
                        ))
                )
        },
    },
})

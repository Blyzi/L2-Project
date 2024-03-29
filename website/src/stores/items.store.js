import { defineStore } from 'pinia'
import { $axios } from '@/config/axios'
import _ from 'lodash'

export const useItemStore = defineStore('item', {
    state: () => {
        return { items: [] }
    },
    actions: {
        async getItems() {
            await $axios.get('/item').then(({ data }) => (this.items = data))
        },

        async createItem(item) {
            await $axios.post('/item', item).then(({ data }) => {
                this.items.push(data)
            })
        },

        async updateItem(itemid, item) {
            await $axios
                .patch(`/item/${itemid}`, {
                    ..._.omit(item, 'thingType'),
                    thingTypeId: item?.thingType?.thingTypeId,
                })
                .then(({ data }) => {
                    Object.assign(
                        this.items.find((item) => item.thingId === itemid),
                        data
                    )
                })
        },

        async deleteItem(itemid) {
            await $axios
                .delete(`/item/${itemid}`)
                .then(
                    () =>
                        (this.items = this.items.filter(
                            (item) => item.thingId !== itemid
                        ))
                )
        },
    },
})

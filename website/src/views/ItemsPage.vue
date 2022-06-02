<template>
    <BasePage>
        <div class="text-3xl font-bold mb-4">Items</div>
        <div class="flex flex-col gap-2">
            <div class="flex justify-between">
                <SearchBar v-model="searchInput" class="w-1/2"></SearchBar>
                <div
                    class="btn-primary flex items-center gap-1"
                    @click=";(modalOpen = true), (action = 'add')"
                >
                    Add new item <PlusSmIcon class="h-5 stroke-1"></PlusSmIcon>
                </div>
            </div>
            <div class="overflow-x-auto flex justify-center text-left">
                <table class="w-full">
                    <thead>
                        <tr class="border-b">
                            <th class="p-2">Nom</th>
                            <th class="p-2">Stock</th>
                            <th class="p-2">Utilisation</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(item, i) in itemStore.items"
                            :key="i"
                            class="even:bg-gray-200 group"
                        >
                            <td class="p-2 rounded-l">
                                {{ item.name }}
                            </td>

                            <td class="p-2 text-sm">
                                {{ item.stock }}
                            </td>
                            <td class="p-2 text-sm">
                                {{
                                    item?.event?.length ? item.event.length : 0
                                }}
                            </td>
                            <td class="p-2 rounded-r">
                                <div
                                    class="flex justify-end gap-2 invisible group-hover:visible"
                                >
                                    <PencilIcon
                                        class="h-5 stroke-1 hover:text-blue-500 cursor-pointer"
                                        @click="
                                            ;(action = 'edit'),
                                                (modalOpen = true),
                                                (newItem = { ...item })
                                        "
                                    ></PencilIcon>
                                    <TrashIcon
                                        class="h-5 stroke-1 hover:text-red-500 cursor-pointer"
                                        @click="
                                            itemStore.deleteItem(item.thingId)
                                        "
                                    ></TrashIcon>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <AppModal
            :is-open="modalOpen"
            @close-modal="
                ;(modalOpen = false),
                    (newItem = {
                        name: '',
                        stock: '0',
                    })
            "
        >
            <div class="flex flex-col gap-2 justify-center p-4">
                <TextInput v-model="newItem.name" placeholder="Nom"></TextInput>
                <TextInput
                    v-model="newItem.stock"
                    placeholder="Nombre"
                    input-type="number"
                ></TextInput>
                <div class="btn-primary" @click="actions[action]">Envoyer</div>
            </div>
        </AppModal>
    </BasePage>
</template>

<script setup>
import BasePage from '@/components/App/BasePage.vue'
import { useItemStore } from '@/stores/items.store'
import { ref } from 'vue'
import SearchBar from '@/components/Inputs/SearchBar.vue'
import { PencilIcon, TrashIcon, PlusSmIcon } from '@heroicons/vue/outline'
import AppModal from '../components/App/AppModal.vue'
import TextInput from '@/components/Inputs/TextInput.vue'
import _ from 'lodash'

const itemStore = useItemStore()
itemStore.getItems()

const searchInput = ref('')
const modalOpen = ref(false)
const action = ref(null)

const newItem = ref({
    name: '',
    stock: '0',
})

const actions = {
    add: () => {
        itemStore.createItem(newItem.value)
        modalOpen.value = false
        newItem.value = {
            name: '',
            stock: '0',
        }
    },
    edit: () => {
        itemStore.updateItem(
            newItem.value.thingId,
            _.omit(newItem.value, 'thingId')
        )
        modalOpen.value = false
        newItem.value = {
            name: '',
            stock: '0',
        }
    },
}
</script>

<template>
    <BasePage>
        <div class="text-3xl font-bold mb-4">Items</div>
        <div class="flex flex-col gap-2">
            <div class="flex justify-between">
                <SearchBar v-model="searchInput" class="w-1/2"></SearchBar>
                <div class="btn-primary flex items-center gap-1">
                    Add new item <PlusSmIcon class="h-5 stroke-1"></PlusSmIcon>
                </div>
            </div>
            <div class="overflow-x-auto flex justify-center text-left">
                <table class="w-full">
                    <thead>
                        <tr class="border-b">
                            <th class="p-2">Nom</th>
                            <th class="p-2">Stock</th>
                            <th class="p-2">Restant</th>
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
                                {{ item.stock - 2 }}
                            </td>
                            <td class="p-2 rounded-r">
                                <div
                                    class="flex justify-end gap-2 invisible group-hover:visible"
                                >
                                    <PencilIcon
                                        class="h-5 stroke-1 hover:text-blue-500 cursor-pointer"
                                    ></PencilIcon>
                                    <TrashIcon
                                        class="h-5 stroke-1 hover:text-red-500 cursor-pointer"
                                    ></TrashIcon>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        {{ itemStore.items }}
    </BasePage>
</template>

<script setup>
import BasePage from '@/components/App/BasePage.vue'
import { useItemStore } from '@/stores/items.store'
import { ref } from 'vue'
import SearchBar from '@/components/Inputs/SearchBar.vue'
import { PencilIcon, TrashIcon, PlusSmIcon } from '@heroicons/vue/outline'

const itemStore = useItemStore()
itemStore.getItems()

setTimeout(
    () =>
        itemStore.updateItem(1, {
            name: 'test',
            stock: 1,
        }),
    5000
)

const searchInput = ref('')
</script>

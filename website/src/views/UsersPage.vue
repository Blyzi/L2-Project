<template>
    <BasePage>
        <div class="text-3xl font-bold mb-4">Users</div>
        <div class="flex flex-col gap-2">
            <div class="flex justify-between">
                <SearchBar v-model="searchInput" class="w-1/2"></SearchBar>
                <div class="btn-primary flex items-center gap-1">
                    Add new user
                    <PlusSmIcon class="h-5 stroke-1"></PlusSmIcon>
                </div>
            </div>
            <div class="overflow-x-auto flex justify-center text-left">
                <table class="w-full">
                    <thead>
                        <tr class="border-b">
                            <th class="p-2">Nom</th>
                            <th class="p-2">Mail</th>
                            <th class="p-2">Téléphone</th>
                            <th class="p-2">Age</th>
                            <th class="p-2">Description</th>
                            <th class="p-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(user, i) in userStore.users"
                            :key="i"
                            class="even:bg-gray-200 group"
                        >
                            <td class="p-2 rounded-l">
                                {{ user.firstname }} {{ user.lastname }}
                            </td>
                            <td class="p-2 text-sm">
                                <a
                                    class="hover:underline"
                                    :href="'mailto:' + user.mail"
                                    >{{ user.mail }}</a
                                >
                            </td>
                            <td class="p-2 text-sm">
                                <a
                                    class="hover:underline"
                                    :href="'tel:' + user.phoneNumber"
                                >
                                    {{
                                        user.phoneNumber
                                            ? user.phoneNumber
                                            : '-'
                                    }}</a
                                >
                            </td>
                            <td class="p-2">
                                {{
                                    user.birthDate
                                        ? dayjs().diff(user.birthDate, 'years')
                                        : '-'
                                }}
                            </td>
                            <td class="p-2 text-sm">
                                {{ user.description ? user.description : '-' }}
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
    </BasePage>
</template>

<script setup>
import BasePage from '@/components/App/BasePage.vue'
import { useUserStore } from '@/stores/users.store'
import SearchBar from '@/components/Inputs/SearchBar.vue'
import { PencilIcon, TrashIcon, PlusSmIcon } from '@heroicons/vue/outline'
import dayjs from 'dayjs'
import { ref } from 'vue'
import AppModal from '../components/App/AppModal.vue'

const userStore = useUserStore()
userStore.getUsers()
const searchInput = ref('')

const modalOpen = ref(true)
</script>

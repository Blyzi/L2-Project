<template>
    <BasePage>
        <div class="text-3xl font-bold">Users</div>
        <div class="overflow-x-auto">
            <table>
                <thead>
                    <tr>
                        <th class="p-2">Prénom</th>
                        <th class="p-2">Nom</th>
                        <th class="p-2">Mail</th>
                        <th class="p-2">Age</th>
                        <th class="p-2">Téléphone</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, i) in userStore.users" :key="i">
                        <td class="">{{ user.firstname }}</td>
                        <td class="">{{ user.lastname }}</td>
                        <td class="">{{ user.mail }}</td>
                        <td class="">{{ user.birthDate }}</td>
                        <td class="">{{ user.phoneNumber }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </BasePage>
</template>

<script setup>
import BasePage from '../components/App/BasePage.vue'
import { useUserStore } from '../stores/users.store'
const userStore = useUserStore()
userStore.getUser()
</script>

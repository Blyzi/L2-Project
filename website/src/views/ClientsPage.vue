<template>
    <BasePage>
        <div class="text-3xl font-bold mb-4">Clients</div>
        <div class="flex flex-col gap-2">
            <div class="flex justify-between">
                <SearchBar v-model="searchInput" class="w-1/2"></SearchBar>
                <div
                    @click=";(action = 'add'), (modalOpen = true)"
                    class="btn-primary flex items-center gap-1"
                >
                    Add new client
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
                            v-for="(client, i) in clientStore.clients"
                            :key="i"
                            class="even:bg-gray-200 group"
                        >
                            <td class="p-2 rounded-l">
                                {{ client.firstname }} {{ client.lastname }}
                            </td>
                            <td class="p-2 text-sm">
                                <a
                                    class="hover:underline"
                                    :href="'mailto:' + client.mail"
                                    >{{ client.mail }}</a
                                >
                            </td>
                            <td class="p-2 text-sm">
                                <a
                                    class="hover:underline"
                                    :href="'tel:' + client.phoneNumber"
                                >
                                    {{
                                        client.phoneNumber
                                            ? client.phoneNumber
                                            : '-'
                                    }}</a
                                >
                            </td>
                            <td class="p-2">
                                {{
                                    client.birthDate
                                        ? dayjs().diff(
                                              client.birthDate,
                                              'years'
                                          )
                                        : '-'
                                }}
                            </td>
                            <td class="p-2 text-sm">
                                {{
                                    client.description
                                        ? client.description
                                        : '-'
                                }}
                            </td>
                            <td class="p-2 rounded-r">
                                <div
                                    class="flex justify-end gap-2 invisible group-hover:visible"
                                >
                                    <PencilIcon
                                        class="h-5 stroke-1 hover:text-blue-500 cursor-pointer"
                                        @click="
                                            ;(newClient = {
                                                peopleId: client.peopleId,
                                                firstname: client.firstname,
                                                lastname: client.lastname,
                                                mail: client.mail,
                                                phoneNumber: client.phoneNumber,
                                                birthDate: client.birthDate,
                                                description: client.description,
                                            }),
                                                (modalOpen = true),
                                                (action = 'update')
                                        "
                                    ></PencilIcon>
                                    <TrashIcon
                                        @click="
                                            clientStore.deleteClient(
                                                client.peopleId
                                            )
                                        "
                                        class="h-5 stroke-1 hover:text-red-500 cursor-pointer"
                                    ></TrashIcon>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <AppModal :is-open="modalOpen" @close-modal="modalOpen = false">
            <div class="flex flex-col gap-2 justify-center p-4">
                <div class="flex gap-2">
                    <TextInput
                        v-model="newClient.firstname"
                        placeholder="Prenom"
                    ></TextInput>
                    <TextInput
                        v-model="newClient.lastname"
                        placeholder="Nom"
                    ></TextInput>
                </div>
                <div class="flex gap-2">
                    <TextInput
                        v-model="newClient.mail"
                        input-type="mail"
                        placeholder="Email"
                    ></TextInput>
                    <TextInput
                        v-model="newClient.phoneNumber"
                        input-type="tel"
                        placeholder="Tel"
                    ></TextInput>
                </div>
                <div class="btn-primary" @click="actions[action]">Envoyer</div>
            </div>
        </AppModal>
    </BasePage>
</template>

<script setup>
import BasePage from '@/components/App/BasePage.vue'
import { useClientStore } from '@/stores/clients.store'
import SearchBar from '@/components/Inputs/SearchBar.vue'
import { PencilIcon, TrashIcon, PlusSmIcon } from '@heroicons/vue/outline'
import { ref } from 'vue'
import dayjs from 'dayjs'
import AppModal from '../components/App/AppModal.vue'
import TextInput from '../components/Inputs/TextInput.vue'
import _ from 'lodash'

const clientStore = useClientStore()
clientStore.getClients()
const searchInput = ref('')

const modalOpen = ref(false)

const newClient = ref({
    firstname: '',
    lastname: '',
    mail: '',
    phoneNumber: '',
})

const action = ref('')

const actions = {
    add: () => {
        clientStore.createClient(newClient.value)
        modalOpen.value = false
        newClient.value = {
            firstname: '',
            lastname: '',
            mail: '',
            phoneNumber: '',
        }
    },
    update: () => {
        clientStore.updateClient(
            newClient.value.peopleId,
            _.omit(newClient.value, ['peopleId'])
        )
        modalOpen.value = false
        newClient.value = {
            firstname: '',
            lastname: '',
            mail: '',
            phoneNumber: '',
        }
    },
}
</script>

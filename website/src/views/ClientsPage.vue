<template>
    <BasePage>
        <div class="text-3xl font-bold mb-4">Clients</div>
        <div class="flex flex-col gap-2">
            <div class="flex justify-between">
                <SearchBar v-model="searchInput" class="w-1/2"></SearchBar>
                <div
                    class="btn-primary flex items-center gap-1"
                    @click=";(action = 'add'), (modalOpen = true)"
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
                                <div v-if="client.description">
                                    <div
                                        v-for="(
                                            line, k
                                        ) in client.description.split('\n')"
                                        :key="k"
                                    >
                                        {{ line }}
                                        <br />
                                    </div>
                                </div>
                                <div v-else>-</div>
                            </td>
                            <td class="p-2 rounded-r">
                                <div
                                    class="flex justify-end gap-2 invisible group-hover:visible"
                                >
                                    <PencilIcon
                                        class="h-5 stroke-1 hover:text-blue-500 cursor-pointer"
                                        @click="
                                            ;(modalOpen = true),
                                                (action = 'update')
                                        "
                                    ></PencilIcon>
                                    <TrashIcon
                                        class="h-5 stroke-1 hover:text-red-500 cursor-pointer"
                                        @click="
                                            clientStore.deleteClient(
                                                client.peopleId
                                            )
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
                    (newClient = {
                        firstname: '',
                        lastname: '',
                        mail: '',
                        phoneNumber: '',
                        description: '',
                        birthDate: '',
                    })
            "
        >
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

                <TextAeraInput
                    v-model="newClient.description"
                    placeholder="Description"
                    :rows="3"
                ></TextAeraInput>
                <DateTimeInput
                    v-model="newClient.birthDate"
                    placeholder="Année de naissance"
                ></DateTimeInput>
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
import TextAeraInput from '../components/Inputs/TextAeraInput.vue'
import DateTimeInput from '../components/Inputs/DateTimeInput.vue'
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
    description: '',
    birthDate: '',
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
            description: '',
            birthDate: '',
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
            description: '',
            birthDate: '',
        }
    },
}
</script>

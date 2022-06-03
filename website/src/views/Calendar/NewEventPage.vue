<template>
    <BasePage>
        <div class="flex flex-col gap-4 w-full h-full">
            <div class="text-3xl font-bold">Ajouter un evenements</div>
            <div class="flex gap-2">
                <div class="flex flex-col w-1/2">
                    <TextInput v-model="newEvent.title" placeholder="Title">
                    </TextInput>
                    <TextAeraInput
                        v-model="newEvent.description"
                        placeholder="Description"
                        rows="3"
                    >
                    </TextAeraInput>
                    <DateTimeInput
                        v-model="newEvent.start"
                        input-type="datetime-local"
                        placeholder="Debut"
                    ></DateTimeInput>
                    <DateTimeInput
                        v-model="newEvent.end"
                        input-type="datetime-local"
                        placeholder="Fin"
                    ></DateTimeInput>
                </div>
                <div class="flex flex-col">
                    <div class="flex flex-col">
                        <div class="text-xl">Clients</div>
                        <div
                            v-for="(client, i) in clientStore.clients"
                            :key="i"
                            class="w-full"
                        >
                            <label>
                                <input
                                    v-model="newEvent.clientsId"
                                    type="checkbox"
                                    :value="client.peopleId"
                                />
                                {{ client.firstname }}
                                {{ client.lastname }}
                            </label>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <div class="text-xl">Users</div>
                        <div
                            v-for="(user, i) in userStore.users"
                            :key="i"
                            class="w-full flex items-center"
                        >
                            <label>
                                <input
                                    v-model="newEvent.usersId"
                                    type="checkbox"
                                    :value="user.peopleId"
                                />
                                {{ user.firstname }}
                                {{ user.lastname }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn-primary" @click="eventStore.createEvent(newEvent)">
                Ajouter
            </div>
        </div>
    </BasePage>
</template>

<script setup>
import BasePage from '@/components/App/BasePage.vue'
import TextInput from '../../components/Inputs/TextInput.vue'
import DateTimeInput from '../../components/Inputs/DateTimeInput.vue'
import TextAeraInput from '../../components/Inputs/TextAeraInput.vue'
import { useClientStore } from '@/stores/clients.store'
import { useUserStore } from '@/stores/users.store'
import { useEventStore } from '@/stores/event.store'
import { ref } from 'vue'

const clientStore = useClientStore()
const userStore = useUserStore()
const eventStore = useEventStore()

clientStore.getClients()
userStore.getUsers()

const newEvent = ref({
    title: '',
    description: '',
    start: '',
    end: '',
    usersId: [],
    clientsId: [],
})
</script>

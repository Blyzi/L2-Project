<template>
    <BasePage>
        <div class="flex flex-col gap-4 w-full h-full">
            <div class="text-3xl font-bold">Ajouter un evenements</div>
            <div class="flex gap-">
                <div class="flex flex-col">
                    <TextInput v-model="newEvent.title" placeholder="Title">
                    </TextInput>
                    <TextInput
                        v-model="newEvent.title"
                        placeholder="Description"
                    >
                    </TextInput>
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
                    {{ newEvent.start }}
                </div>
            </div>
        </div>
    </BasePage>
</template>

<script setup>
import BasePage from '@/components/App/BasePage.vue'
import TextInput from '../../components/Inputs/TextInput.vue'
import DateTimeInput from '../../components/Inputs/DateTimeInput.vue'
import { useClientStore } from '@/stores/clients.store'
import { useUserStore } from '@/stores/users.store'
import { useEventStore } from '@/stores/event.store'
import { ref } from 'vue'

const newEvent = ref({
    title: '',
    description: '',
    start: '',
    end: '',
})
</script>

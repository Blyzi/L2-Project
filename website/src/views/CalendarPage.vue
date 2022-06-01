<template>
    <BasePage>
        <div class="flex flex-col h-full w-full">
            <div class="text-3xl font-bold mb-4">Calendar</div>
            <div class="flex flex-col gap-4 grow">
                <div class="flex flex-col gap-2 w-full grow">
                    <div class="flex justify-between gap-2">
                        <div class="flex gap-6 items-center">
                            <div
                                class="btn-flat"
                                @click="
                                    $refs.vuecal.switchView('day', new Date())
                                "
                            >
                                Aujourd'hui
                            </div>
                            <div class="flex gap-1">
                                <ChevronLeftIcon
                                    class="h-6"
                                    @click="$refs.vuecal.previous()"
                                ></ChevronLeftIcon>
                                <ChevronRightIcon
                                    class="h-6"
                                    @click="$refs.vuecal.next()"
                                ></ChevronRightIcon>
                            </div>
                            <div class="">
                                {{ dayjs(selectedDate).format('ddd LL') }}
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="btn-flat flex divide-x divide-gray-400">
                                <div class="px-2" @click="activeView = 'month'">
                                    Mois
                                </div>
                                <div class="px-2" @click="activeView = 'week'">
                                    Semaine
                                </div>
                                <div class="px-2" @click="activeView = 'day'">
                                    Jour
                                </div>
                            </div>
                            <div class="btn-primary">
                                <PlusIcon class="m-1 h-4 stroke-1"></PlusIcon>
                            </div>
                        </div>
                    </div>
                    <VueCal
                        ref="vuecal"
                        :events="eventStore.eventParse"
                        class="vuecal--blue-theme grow"
                        :="calendarConfig"
                        events-count-on-year-view
                        editable-events
                        hide-view-selector
                        hide-title-bar
                        :active-view="activeView"
                        @view-change="selectedDate = $event.startDate"
                    >
                        <template #today-button>
                            <LocationMarkerIcon
                                class="h-5"
                            ></LocationMarkerIcon>
                        </template>
                        <template #arrow-prev>
                            <ChevronLeftIcon class="h-6"></ChevronLeftIcon>
                        </template>
                        <template #arrow-next>
                            <ChevronRightIcon
                                class="ml-2 h-6"
                            ></ChevronRightIcon>
                        </template>
                    </VueCal>
                </div>
            </div>
        </div>
    </BasePage>
</template>

<script setup>
import BasePage from '../components/App/BasePage.vue'
import VueCal from 'vue-cal'
import 'vue-cal/dist/drag-and-drop.js'
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/i18n/fr.js'
import { useEventStore } from '@/stores/event.store'
import {
    LocationMarkerIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    PlusIcon,
} from '@heroicons/vue/outline'
import { ref } from 'vue'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/fr'

dayjs.locale('fr')
dayjs.extend(localizedFormat)

const eventStore = useEventStore()
eventStore.getEvents()

const calendarConfig = {
    locale: 'fr',
    'disable-views': ['years', 'year'],
    timeFrom: 8 * 60,
    timeTo: 22 * 60,
    editableEvents: {
        title: true,
        drag: true,
        resize: true,
        delete: true,
        create: true,
    },
    'today-button': true,
    'snap-to-time': 10,
}

const activeView = ref('day')
const vuecal = ref(null)
const selectedDate = ref(new Date())
</script>

<template>
    <div class="flex flex-col gap-2 shadow-md h-screen w-3/12">
        <router-link
            class="p-4 border-b flex justify-center items-center gap-4"
            to="/"
        >
            <img src="@/assets/img/logo/logo.svg" class="h-10" alt="" />
            <div class="font-bold text-xl">Ogenda</div>
        </router-link>

        <router-link
            v-for="(route, i) in routes"
            :key="i"
            class="flex justify-between items-center rounded hover:bg-gray-100 p-2 mx-2 group"
            :to="route.path"
            :class="{ 'text-blue-500': route.path === $route.path }"
        >
            <div class="flex gap-2">
                <component :is="route.icon" class="h-6"></component>
                {{ route.name }}
            </div>
            <router-link
                v-if="route?.more"
                class="hover:bg-gray-200 invisible group-hover:visible rounded-full p-1"
                :to="route.more"
            >
                <PlusSmIcon class="h-5"></PlusSmIcon>
            </router-link>
        </router-link>
    </div>
</template>

<script setup>
import {
    LogoutIcon,
    CalendarIcon,
    UserGroupIcon,
    CogIcon,
    TruckIcon,
    UsersIcon,
    PlusSmIcon,
} from '@heroicons/vue/outline'

const routes = [
    {
        path: '/calendar',
        name: 'Calendar',
        icon: CalendarIcon,
        more: '/calendar/new',
    },
    {
        path: '/items',
        name: 'Items',
        icon: TruckIcon,
    },
    {
        path: '/clients',
        name: 'Clients',
        icon: UserGroupIcon,
    },
    {
        path: '/users',
        name: 'Users',
        icon: UsersIcon,
    },
    {
        path: '/settings',
        name: 'Settings',
        icon: CogIcon,
    },
    {
        path: '/login',
        name: 'Logout',
        icon: LogoutIcon,
    },
]
</script>

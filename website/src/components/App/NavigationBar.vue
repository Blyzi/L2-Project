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
            class="flex items-center gap-2 rounded hover:bg-gray-100 p-2 mx-2"
            :to="route.path"
            :class="{ 'text-blue-500': route.path === $route.path }"
        >
            <component :is="route.icon" class="h-6"></component>
            {{ route.name }}
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
} from '@heroicons/vue/outline'

const routes = [
    {
        path: '/calendar',
        name: 'Calendar',
        icon: CalendarIcon,
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

<template>
    <div class="h-screen w-screen flex justify-center items-center">
        <div
            class="card px-10 py-8 flex justify-center flex-col gap-4 w-11/12 sm:1/2 md:w-7/12 lg:w-5/12"
        >
            <div class="flex gap-4 items-center mb-4">
                <img class="h-10" src="@/assets/img/logo/logo.svg" />
                <div class="text-3xl font-medium">Register</div>
            </div>

            <TextInput
                v-model="usernameInput"
                class="w-full"
                placeholder="Email"
                input-type="email"
            ></TextInput>
            <TextInput
                v-model="passwordInput"
                class="w-full"
                placeholder="Password"
                input-type="password"
            ></TextInput>
            <div class="flex justify-between text-sm mb-4">
                <label
                    class="flex items-center gap-2 cursor-pointer hover:underline"
                    ><input type="checkbox" /> Se souvenir de moi</label
                >
                <div class="cursor-pointer hover:underline">
                    Mot de passe oublié ?
                </div>
            </div>

            <div class="btn-primary w-full">Login</div>
            <div class="flex divide-x text-sm mx-auto">
                <router-link
                    class="px-2 cursor-pointer hover:underline"
                    to="login"
                >
                    Login</router-link
                >
                <div class="px-2 cursor-pointer hover:underline">
                    Faire autre chose
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import TextInput from '@/components/Inputs/TextInput.vue'
import { ref } from 'vue'

const usernameInput = ref('')
const passwordInput = ref('')
</script>

<template>
    <div class="h-screen w-screen flex justify-center items-center">
        <div
            class="card px-10 py-8 flex justify-center flex-col gap-4 w-11/12 sm:1/2 md:w-7/12 lg:w-5/12"
        >
            <div class="flex gap-4 items-center mb-4">
                <img class="h-10" src="@/assets/img/logo/logo.svg" />
                <div class="text-3xl font-medium">Login</div>
            </div>
            <form class="flex flex-col gap-2">
                <TextInput
                    v-model="usernameInput"
                    class="w-full"
                    placeholder="Email"
                    input-type="email"
                    autocomplete="email"
                    :error="error"
                    @update:model-value="error = false"
                ></TextInput>
                <TextInput
                    v-model="passwordInput"
                    class="w-full"
                    placeholder="Password"
                    input-type="password"
                    error-message="Invalid login or password"
                    autocomplete="current-password"
                    :error="error"
                    @update:model-value="error = false"
                ></TextInput>
                <div class="flex justify-between text-sm mb-4 px-1">
                    <label
                        class="flex items-center gap-2 cursor-pointer hover:underline"
                        ><input type="checkbox" class="cursor-pointer" /> Se
                        souvenir de moi
                    </label>
                    <div class="cursor-pointer hover:underline">
                        Mot de passe oublié ?
                    </div>
                </div>

                <button class="btn-primary w-full" @click.prevent="login">
                    Login
                </button>
            </form>
            <div class="flex divide-x text-sm mx-auto">
                <router-link
                    class="px-2 cursor-pointer hover:underline"
                    to="register"
                >
                    Register</router-link
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
import { useAuthStore } from '@/stores/auth.store'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()

const router = useRouter()

const usernameInput = ref('')
const passwordInput = ref('')
const error = ref(false)

const login = async () => {
    if (await authStore.login(usernameInput.value, passwordInput.value)) {
        router.push('/calendar')
    } else {
        error.value = true
    }
}
</script>

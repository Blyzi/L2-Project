<template>
    <div>
        <div
            class="relative rounded-lg outline outline-1 flex items-center justify-between cursor-text"
            :class="{
                'outline-blue-500 ': !error && isFocused,
                'outline-red-500': error,
                'outline-2': isFocused,
            }"
            @click="input.focus()"
        >
            <div v-if="placeholder" class="absolute flex items-center">
                <div
                    class="transition-all rounded-full my-2 px-4"
                    :class="[
                        isFocused || modelValue.length
                            ? 'translate-x-2 -translate-y-6 bg-white text-xs '
                            : 'translate-x-0 translate-y-0 text-base',
                        ,
                        { 'text-blue-500': isFocused && !error },
                        { 'text-red-500': error },
                    ]"
                >
                    {{ placeholder }}
                </div>
            </div>
            <input
                ref="input"
                class="py-2 px-4 w-full outline-none"
                :type="
                    inputType == 'password' && showPassword ? 'text' : inputType
                "
                :value="modelValue"
                :autocomplete="autocomplete"
                @focusin="isFocused = true"
                @focusout="isFocused = false"
                @input="$emit('update:modelValue', $event.target.value)"
            />
            <div
                v-if="inputType == 'password' && modelValue.length"
                class="h-full flex justify-center items-center pr-4 cursor-pointer"
                @click="showPassword = !showPassword"
            >
                <EyeIcon
                    v-if="showPassword"
                    class="h-5"
                    :class="{ 'text-red-500': error }"
                ></EyeIcon>
                <EyeOffIcon
                    v-else
                    class="h-5"
                    :class="{ 'text-red-500': error }"
                ></EyeOffIcon>
            </div>
        </div>
        <div
            class="flex gap-2 text-xs text-red-500 ml-4 mt-1 items-center"
            :class="{ invisible: !error || errorMessage == null }"
        >
            <ExclamationCircleIcon class="h-3"></ExclamationCircleIcon>
            {{ errorMessage }}
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

//HeroIcons
import {
    EyeIcon,
    EyeOffIcon,
    ExclamationCircleIcon,
} from '@heroicons/vue/outline'

defineProps({
    modelValue: { type: String, required: true },
    placeholder: { type: String, default: null },
    inputType: { type: String, default: 'text' },
    error: { type: Boolean, default: false },
    errorMessage: { type: String, default: null },
    autocomplete: { type: String, default: null },
})

defineEmits(['update:modelValue'])

const input = ref(null)
const isFocused = ref(false)
const showPassword = ref(false)
</script>

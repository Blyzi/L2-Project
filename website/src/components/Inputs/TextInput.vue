<template>
    <div
        class="m-1 relative rounded outline outline-1 w-48"
        :class="{ 'outline-blue-400 outline-2': isFocused }"
        @click="input.focus()"
    >
        <div
            class="absolute w-full h-full flex items-center"
            :class="{ 'text-blue-400': isFocused }"
        >
            <div
                class="transition-all duration-200 rounded-full p-2"
                :class="[
                    isFocused || modelValue.length
                        ? 'translate-x-2 -translate-y-6 bg-white text-xs'
                        : 'translate-x-0 translate-y-0 text-base',
                ]"
            >
                Username
            </div>
        </div>
        <input
            ref="input"
            class="p-2 w-full outline-none"
            type="text"
            :value="modelValue"
            @focusin="isFocused = true"
            @focusout="isFocused = false"
            @input="$emit('update:modelValue', $event.target.value)"
        />
    </div>
    {{ isFocused }}
    {{ modelValue }}
</template>

<script setup>
import { ref } from 'vue'

defineProps({ modelValue: { type: String, required: true } })
defineEmits(['update:modelValue'])

const input = ref(null)
const isFocused = ref(false)
</script>

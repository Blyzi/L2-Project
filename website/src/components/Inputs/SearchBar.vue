<template>
    <div
        class="flex items-center gap-2 p-2 outline outline-1 outline-gray-500 relative rounded-lg cursor-text"
        @click="input.focus()"
    >
        <SearchIcon class="h-5"></SearchIcon>
        <input
            ref="input"
            class="grow outline-none bg-gray-50"
            type="text"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        />
    </div>
</template>

<script setup>
import { SearchIcon } from '@heroicons/vue/outline'
import { ref } from 'vue'
defineProps({
    modelValue: {
        required: true,
        type: String,
    },
})
defineEmits(['update:modelValue'])
const input = ref(null)
</script>

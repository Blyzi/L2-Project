<template>
    <teleport to="#app">
        <div
            class="absolute z-50"
            style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
        >
            <transition name="pop-up">
                <div
                    v-if="isOpen"
                    ref="modal"
                    class="card"
                    @keyup.esc="$emit('closeModal')"
                >
                    <slot></slot>
                </div>
            </transition>
        </div>
    </teleport>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    },
})
const emit = defineEmits(['closeModal'])

const modal = ref(null)

onClickOutside(modal, () => {
    emit('closeModal')
})
</script>

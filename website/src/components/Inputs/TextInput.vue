<template>
    <div
        class="m-1 relative rounded-lg outline outline-1 flex items-center justify-between cursor-text"
        :class="{ 'outline-blue-500 outline-2': isFocused }"
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
                    { 'text-blue-500': isFocused },
                ]"
            >
                {{ placeholder }}
            </div>
        </div>
        <input
            ref="input"
            class="py-2 pl-4 w-full outline-none"
            :type="realInputType"
            :value="modelValue"
            @focusin="isFocused = true"
            @focusout="isFocused = false"
            @input="$emit('update:modelValue', $event.target.value)"
        />
        <div
            v-if="inputType == 'password' && modelValue.length"
            class="h-full flex justify-center items-center px-4 cursor-pointer"
            @click="seeValue = !seeValue"
        >
            <EyeIcon v-if="seeValue" class="h-5"></EyeIcon>
            <EyeOffIcon v-else class="h-5"></EyeOffIcon>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

//HeroIcons
import { EyeIcon } from '@heroicons/vue/outline'
import { EyeOffIcon } from '@heroicons/vue/outline'

const props = defineProps({
    modelValue: { type: String, required: true },
    placeholder: { type: String, default: null },
    inputType: { type: String, default: 'text' },
})

defineEmits(['update:modelValue'])

const input = ref(null)
const isFocused = ref(false)
const seeValue = ref(false)

const realInputType = computed(() => {
    console.log(props)
    if (seeValue.value == true) {
        return 'text'
    }
    return props.inputType.value
})
</script>

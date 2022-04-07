<template>
    <div>
        <TextInput v-model="input"></TextInput>
    </div>
</template>

<script setup>
import TextInput from '../components/Inputs/TextInput.vue'
import { ref } from 'vue'

const input = ref('')
</script>

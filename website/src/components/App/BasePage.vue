<template>
    <div class="flex">
        <NavigationBar></NavigationBar>
        <slot></slot>
    </div>
</template>

<script setup>
import NavigationBar from './NavigationBar.vue'
</script>

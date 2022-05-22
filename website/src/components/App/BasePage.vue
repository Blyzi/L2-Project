<template>
    <div class="flex w-screen">
        <NavigationBar></NavigationBar>
        <div class="p-4 w-9/12"><slot></slot></div>
    </div>
</template>

<script setup>
import NavigationBar from './NavigationBar.vue'
</script>

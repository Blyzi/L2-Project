<template>
    <div class="flex w-screen">
        <NavigationBar class="sticky top-0 shrink-0"></NavigationBar>
        <div class="p-4 grow"><slot></slot></div>
    </div>
</template>

<script setup>
import NavigationBar from './NavigationBar.vue'
</script>

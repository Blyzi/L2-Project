<template>
    <div class="bg-gray-50">
        <router-view></router-view>
        <hr />
        <ul>
            <li><router-link to="login">Login</router-link></li>
            <li><router-link to="register">Register</router-link></li>
        </ul>
    </div>
</template>

<script setup></script>

<style lang="scss">
@import './assets/style/main.scss';
</style>

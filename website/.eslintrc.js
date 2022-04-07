module.exports = {
    env: {
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
    plugins: ['prettier'],

    rules: {
        'no-undef': 'off',
        'no-console': 'warn',
        'prettier/prettier': 'error',
        'vue/no-undef-properties': 'error',
    },
}

/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-prettier'
    ],
    overrides: [
        {
            files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
            extends: ['plugin:cypress/recommended']
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    // https://stackoverflow.com/questions/57673026/require-and-process-is-not-defined-in-eslint-problem-with-node
    env: {
        browser: true,
        node: true,
        es6: true
    }
}

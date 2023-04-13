<script setup>
import { useAccount } from '@/store/account'

const useAccountStore = useAccount()

</script>

<template lang="pug">
h1 {{useAccountStore.user}}
</template>

<style scoped>

</style>

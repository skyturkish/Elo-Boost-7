<script setup>
import StaticOrders from '@/components/order/StaticOrders'

import { useAccount } from '@/store/account'

const useAccountStore = useAccount()
</script>

<template lang="pug">
StaticOrders(:ordersURL="`/order/customer/${useAccountStore.user._id}`")
</template>

<style scoped>
</style>

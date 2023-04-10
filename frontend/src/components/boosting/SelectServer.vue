<script setup>
import { useCurrentOrder } from '@/store/currentOrder'

const CurrentOrderStore = useCurrentOrder()
</script>

<template lang="pug">
v-select.selection(
    label="Server"
    :items="['Turkey','China']"
    variant="solo"
    v-model="CurrentOrderStore.server"
    )
</template>

<style scoped>
.selection {
    width: 13rem;
}
</style>

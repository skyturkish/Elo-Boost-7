<script setup>
import { useCurrentOrder } from '@/store/currentOrder'

const CurrentOrderStore = useCurrentOrder()
</script>

<template lang="pug">
v-select.selection(
    label="LP Gain"
    :items="['35-30', '30-25', '25-20','20-15','15-10','10-5','5-0']"
    variant="solo"
    v-model="CurrentOrderStore.gainLP"
    )
</template>

<style scoped>
.selection {
    width: 13rem;
}
</style>

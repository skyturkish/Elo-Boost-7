<script setup>
import { useCurrentOrder } from '@/store/currentOrder'

const CurrentOrderStore = useCurrentOrder()

</script>

<template>
    <v-select
    v-model="CurrentOrderStore.currentLP"
    label="Current LP"
    :items="['0-20LP', '20-40LP', '40-60LP', '60-80LP', '80-100LP']"
    ></v-select>
</template>
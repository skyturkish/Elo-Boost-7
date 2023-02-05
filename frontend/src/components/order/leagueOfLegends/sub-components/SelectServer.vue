<script setup>
import { useCurrentOrder } from '@/store/currentOrder'

const CurrentOrderStore = useCurrentOrder()

</script>

<template>
    <v-select
    v-model="CurrentOrderStore.server"
    label="Select Server"
    :items="['Turkey','Vietnam','Eu West']"
    ></v-select>
</template>
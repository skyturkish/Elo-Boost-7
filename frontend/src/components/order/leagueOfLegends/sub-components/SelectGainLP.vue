<script setup>
import { useCurrentOrder } from '@/store/currentOrder'

const CurrentOrderStore = useCurrentOrder()

</script>

<template>
    <v-select
    v-model="CurrentOrderStore.gainLP"
    label="Select Gain LP"
    :items="['21-15 LP or more', '15-9 LP or more', '9-1 LP or more']"
    ></v-select>
</template>
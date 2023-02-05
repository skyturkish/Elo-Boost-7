<script setup>
import { useCurrentOrder } from '@/store/currentOrder'

const CurrentOrderStore = useCurrentOrder()

</script>

<template>
    <v-radio-group
    v-model="CurrentOrderStore.queueType"
    >
        <v-radio label="Solo/Duo" value="Solo/Duo"></v-radio>
        <v-radio label="Flex" value="Flex"></v-radio>
    </v-radio-group>  
</template>
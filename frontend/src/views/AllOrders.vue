<script setup>
import { onMounted } from 'vue'

import axios from 'axios'

import DivisionOrderCard from '@/components/order/DivisionOrderCard'

import { useOrders } from '@/store/orders'

import io from 'socket.io-client'

const UseOrders = useOrders()

const socket = io(process.env.baseURL || 'http://localhost:3000', {
    withCredentials: true
})

socket.on("connect", () => {
   axios.get('/order/tick')
});

onMounted(() =>  {
    UseOrders.getAllOrders()
})
</script>

<template lang="pug">
.orders
  .order(v-for='order in UseOrders.orders' :key='order')
    DivisionOrderCard(:order='order')
</template>

<style scoped>
.orders {
    display: grid;
    grid-template-columns: repeat(5,1fr);
    gap: 2.5rem;
    background-color: grey;
}
</style>

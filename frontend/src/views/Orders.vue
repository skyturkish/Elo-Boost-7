<script setup>
import { ref, onMounted } from 'vue'

import axios from 'axios'

import DivisionOrderCard from '@/components/order/DivisionOrderCard'

import { useOrders } from '@/store/orders'


import io from 'socket.io-client'

const socket = io(process.env.baseURL || 'http://localhost:3000', {
    withCredentials: true
})

socket.on("connect", () => {
  console.log(socket.id);
   axios.get('/order/tick')
});

const UseOrders = useOrders()

onMounted(() =>  {
    console.log('adana')
    UseOrders.getAllOrders()
    console.log(UseOrders.orders)
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
    grid-template-columns: repeat(6,1fr);
    gap: 2.5rem;
    background-color: grey;
}
</style>


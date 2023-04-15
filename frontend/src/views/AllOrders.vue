<script setup>
import { ref,onBeforeUnmount  } from 'vue'

import axios from 'axios'

import DivisionOrderCard from '@/components/order/DivisionOrderCard'

import io from 'socket.io-client'

const orders = ref([])

const socket = io(process.env.baseURL || 'http://localhost:3000', {
    withCredentials: true
})

socket.on("connect",async () => {
    console.log('socket bağlantısı sağlandı')

    socket.emit('join-orders')

    await axios.get('/order/init')
});

socket.on('orders updated', (arg) => {
    console.log('orderslar tetiklendi')
    orders.value = arg
})

onBeforeUnmount(() => {
    socket.emit('leave-orders')
})


</script>

<template lang="pug">
.orders
  .order(v-for='order in orders' :key='order')
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

<script setup>
import { ref,onBeforeUnmount  } from 'vue'

import axios from 'axios'

import LeagueOfLegendsOrderCard from '@/components/order/LeagueOfLegendsOrderCard'

import io from 'socket.io-client'

const orders = ref([])

const socket = io(process.env.baseURL || 'http://localhost:3000', {
    withCredentials: true
})

socket.on("connect",async () => {
    console.log('socket bağlantısı sağlandı')
    console.log('join-orders isteği yollanıyor')
    socket.emit('join-orders')
    console.log('join-orders isteği yollandı')
    console.log('order init yapılacak')

    await axios.get('/order/init')

    console.log('order init yapıldı')


});

socket.on("disconnect", () => {
  console.log('disconnect yapıldı');
});

socket.on('orders updated', (arg) => {
    console.log('orderslar tetiklendi')
    orders.value = arg
})

onBeforeUnmount(() => {
    console.log('suan orderlar terk ediliyor')
    socket.emit('leave-orders')
})

</script>

<template lang="pug">
.orders
  .order(v-for='order in orders' :key='order')
    LeagueOfLegendsOrderCard(:order='order')
</template>

<style scoped>
.orders {
    display: grid;
    grid-template-columns: repeat(5,1fr);
    gap: 2.5rem;
    background-color: grey;
}
</style>

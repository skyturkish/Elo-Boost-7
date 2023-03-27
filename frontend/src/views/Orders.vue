<script setup>
import { ref, onMounted } from 'vue'

import axios from 'axios'

import DivisionOrderCard from '@/components/order/DivisionOrderCard'

const orders = ref({})

async function getAllOrders() {
    const allOrders =  await axios.get('/order',{withCredentials: true})
    orders.value = allOrders
    console.log('bastın buna')
    return true
}

onMounted( async () =>  {
    await getAllOrders()
})


</script>

<template lang="pug">
.orders
  .order(v-for='order in orders.data' :key='order')
    DivisionOrderCard(:order='order'
    @click='getAllOrders()'
    )
</template>

<style scoped>
.orders {
    display: grid;
    grid-template-columns: repeat(6,1fr);
    gap: 2.5rem;
    background-color: grey;
}
</style>


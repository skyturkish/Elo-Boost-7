<script setup>
import { ref, onMounted  } from 'vue'
import axios from 'axios'
import OrderCard from '@/components/order/OrderCard'

const orders = ref([])

onMounted(async () =>   {
  const currentOrders = await axios.get('/order/league-of-legends')
  orders.value = currentOrders.data
})

</script>

<template lang="pug">
.orders
  .order(v-for='order in orders' :key='order')
    OrderCard(:order='order')
</template>

<style scoped>
.orders {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 2.5rem;
}
</style>

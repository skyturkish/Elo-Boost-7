<script setup>
import { onMounted, toRefs, ref } from 'vue'

import axios from 'axios'

import OrderCard from '@/components/order/OrderCard'

const props = defineProps({
  ordersURL: {
    type: String,
    required: true
  }
})

const { ordersURL } = toRefs(props);

const orders = ref([])

onMounted(() =>  {
    axios.get(ordersURL.value)
    .then(res => {
      orders.value = res.data
    })
    .catch(err => {
      console.log(err)
    })
})
</script>

<template lang="pug">
.orders(v-if="orders")
  .order(v-for='order in orders' :key='order')
    OrderCard(:order='order')
</template>

<style scoped>
.orders {
    display: grid;
    grid-template-columns: repeat(5,1fr);
    gap: 2.5rem;
    background-color: grey;
}
</style>

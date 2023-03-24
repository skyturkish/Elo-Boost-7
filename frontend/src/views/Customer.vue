<script setup>
import axios from 'axios'
import { useRoute } from 'vue-router';
import { ref, onMounted} from 'vue'
import DivisionOrderCard from '@/components/order/DivisionOrderCard'

const route = useRoute();  

const customerId = route.params.id

const customerOrders = ref(null)

async function getCustomerOrders() {
    const orders =  await axios.get(`https://game-elo-boost-backend-luvjvoipkq-uc.a.run.app/order/customer/${customerId}`)
    customerOrders.value = orders.data
    return true
}

onMounted( async () =>  {
    await getCustomerOrders()
})


</script>

<template lang="pug">
.body
  .a(v-if="customerOrders !== null")
    .orders(v-if="customerOrders.length !== 0")
      .order(v-for='order in customerOrders' :key='order')
        DivisionOrderCard(:order='order')
    div(v-else)
      h1 No order belong this Customer
  div(v-else)
    h6 loading
</template>

<style scoped>
.orders {
    display: grid;
    grid-template-columns: repeat(6,1fr);
    gap: 2.5rem;
    background-color: grey;
}
</style>


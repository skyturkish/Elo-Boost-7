<script setup>
import axios from 'axios'
import { useRoute } from 'vue-router';
import { ref, onMounted} from 'vue'
import DivisionOrderCard from '@/components/order/DivisionOrderCard'

const route = useRoute();  

const boosterId = route.params.id

const boosterOrders = ref([])

async function getBoosterOrders() {
    const orders =  await axios.get(`http://localhost:3000/order/booster/${boosterId}`)
    boosterOrders.value = orders.data
    return true
}

onMounted( async () =>  {
    await getBoosterOrders()
})


</script>

<template lang="pug">
.body
  .a(v-if="boosterOrders !== null")
    .orders(v-if="boosterOrders.length !== 0")
      .order(v-for='order in boosterOrders' :key='order')
        DivisionOrderCard(:order='order')
    div(v-else)
      h1 No order belong this Booster
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


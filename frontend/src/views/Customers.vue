<script setup>
import { ref, onMounted } from 'vue'

import axios from 'axios'

const customers = ref({})

async function getAllCustomers()  {
    const AllCustomers =  await axios.get('/user/role/customer')
    customers.value = AllCustomers

}

onMounted( async () =>  {
    await getAllCustomers()
    console.log(`All customers have been taken.`)
})
</script>

<template lang="pug">
.customers
  v-card.customer(v-for='customer in customers.data' :key='customer' max-width='344' variant='outlined')
    v-card-item
      div
        .text-overline.mb-1
          | {{customer.name}}
        .text-h6.mb-1
          | {{customer.balance}}
    v-card-actions
      v-btn(variant='outlined' :to='`/customers/${customer._id}`')
        | More Detail
</template>

<style scoped>
.customers {
    display: grid;
    grid-template-columns: repeat(5,1fr);
}
</style>

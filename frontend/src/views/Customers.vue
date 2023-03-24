<script setup>
import { ref, onMounted } from 'vue'

import axios from 'axios'

const customers = ref({})

async function getAllCustomers()  {
    const AllCustomers =  await axios.get('https://game-elo-boost-backend-luvjvoipkq-uc.a.run.app/customer',{withCredentials: true})
    customers.value = AllCustomers

}

onMounted( async () =>  {
    await getAllCustomers()
    console.log(`All customers have benn taken.`)
})

</script>
<template>
    <body>
        <div 
        class="customers"
        > 
            <v-card
            v-for="customer in customers.data" 
            :key="customer"
            class="customer"
            max-width="344"
            variant="outlined"
            >
                <v-card-item>
                <div>
                <div class="text-overline mb-1">
                {{customer.name}}
                </div>
                <div class="text-h6 mb-1">
                {{customer.balance}}
                </div>
                </div>
                </v-card-item>
                <v-card-actions>
                <v-btn 
                variant="outlined"
                :to="`/customers/${customer._id}`"
                >
                More Detail
                </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </body>
</template>

<style scoped>


.customers {
    display: grid;
    grid-template-columns: repeat(5,1fr);
}


</style>


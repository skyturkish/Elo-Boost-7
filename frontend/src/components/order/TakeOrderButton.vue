<script setup>
import { toRefs } from 'vue'
import axios from 'axios'

const props = defineProps({
  orderId: {
    type: String,
    required: true
  }
})
const { orderId } = toRefs(props);

async function takeOrder(){
  await axios.patch('http://localhost:3000/order/leagueOfLegends', {
    orderId: orderId.value,
    object: {
      state: 'taken',
      booster: '63f3e19c11ac9dd322e95d45',
    }
  })
}

</script>

<template lang="pug">
v-btn(variant='outlined' @click='takeOrder')
  | Take Order
</template>

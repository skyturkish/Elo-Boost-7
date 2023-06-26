<script setup>
import { toRefs } from 'vue'
import axios from 'axios'

import { useAccount } from '@/store/account'

const useAccountStore = useAccount()


const props = defineProps({
  orderId: {
    type: String,
    required: true
  }
})
const { orderId } = toRefs(props);

async function takeOrder(){
  await axios.patch('/order', {
    orderId: orderId.value,
    object: {
      state: 'assigned',
      booster: useAccountStore.user._id || 'will handle no user',
    }
  })
}

</script>

<template lang="pug">
v-btn(variant='outlined' @click='takeOrder')
  | Take Order
</template>

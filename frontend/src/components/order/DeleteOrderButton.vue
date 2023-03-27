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

async function deleteOrder() {
  const message = await axios.delete(`/order/${orderId.value}`)
  return message
}

</script>
<template lang="pug">
v-btn(variant='outlined' color='error' @click='deleteOrder') Delete
</template>
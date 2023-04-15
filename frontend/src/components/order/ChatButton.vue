<script setup>
import { toRefs} from 'vue'
import { useRouter} from 'vue-router'

const router = useRouter()

const props = defineProps({
  orderId: {
    type: String,
    required: true
  }
})

const { orderId } = toRefs(props);

</script>

<template lang="pug">
v-btn(variant='outlined' @click='router.push(`/chat/${orderId}`)')
  | Chat
</template>

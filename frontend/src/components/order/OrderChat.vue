<script setup>
import axios from 'axios'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import io from 'socket.io-client'
const socket = io(process.env.baseURL || 'http://localhost:3000', {
    withCredentials: true
})

// import { useRoute, useRouter } from 'vue-router';
// import { useAccount } from '@/store/account'



// const useAccountStore = useAccount()

// const form =  ref(false)
// const valid = ref(false)

// async function validate()   {
//   const { valid } = await form.value.validate()
//   return await valid
// }

// const chat = ref(null)

// const messages = ref([])
// const message = ref('')

// const router = useRouter()
// const route = useRoute();
// const orderId = route.params.orderId

// const isHavePermission = ref(false)

// const messageRules =  [
//     value => {
//         if (value) return true

//         return 'Message is requred.'
//     },
//     value => {
//         if (value?.length < 350) return true

//         return 'Name must be less than 350 characters.'
//     },
// ]

// socket.on("connect", async () => {
//     const initMessages = await axios.get(`/chat/order/${orderId}/init`)
//     messages.value = initMessages.data
// });

// socket.on('messages updated', (message) => {
//     console.log('messages updated')
//     messages.value.unshift(message)
// })

// onMounted(() =>  {
//     axios.get(`/chat/order/${orderId}`).then(res => {
//         chat.value = res.data
//         socket.emit('join-room',orderId)

//         isHavePermission.value = chat.value.participants.includes(useAccountStore.user._id)
//     })
// })

// onBeforeUnmount(() => {
//     socket.emit('leave-room',orderId)
// })

// async function sendMessage() {
//     const valid = await validate()

//     if (!valid) return

//     await axios.post(`/chat/order/${orderId}/messages`, {
//         sender: useAccountStore.user._id,
//         message: message.value
//     })
//     form.value.reset()
// }

// function isMessageBelongSender(messageId) {
//     return messageId == useAccountStore.user._id
// }
</script>

<template lang="pug">
.chat
  .first-row
    .chat-pp
    .chat-name
    .message-icon
  v-divider
  .live-chat

</template>

<style scoped>
.chat {
  width: 900px;
  height: 1016px;
  border-radius: 10px;
  border: solid 1px #eee;
}
.first-row {
  display:flex;
}
.chat-pp {
  width: 62px;
  height: 62px;
  border-radius: 10px;
  background-color: #c4c4c4;
}
</style>

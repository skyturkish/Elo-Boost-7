<script setup>
import axios from 'axios'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useAccount } from '@/store/account'

import io from 'socket.io-client'

const socket = io(process.env.baseURL || 'http://localhost:3000', {
    withCredentials: true
})

const useAccountStore = useAccount()

const form =  ref(false)
const valid = ref(false)

const chat = ref(null)

const messages = ref([])
const message = ref('')

const router = useRouter()
const route = useRoute();
const orderId = route.params.orderId

const isHavePermission = ref(false)

const messageRules =  [
    value => {
        if (value) return true

        return 'Message is requred.'
    },
    value => {
        if (value?.length < 200) return true

        return 'Name must be less than 200 characters.'
    },
]

socket.on("connect", async () => {
    const initMessages = await axios.get(`/chat/order/${orderId}/init`)
    messages.value = initMessages.data
});

socket.on('messages updated', (message) => {
    console.log('messages updated')
    messages.value.unshift(message)
})

onMounted(() =>  {
    axios.get(`/chat/order/${orderId}`).then(res => {
        chat.value = res.data
        socket.emit('join-room',orderId)

        isHavePermission.value = chat.value.participants.includes(useAccountStore.user._id)
    })
})

onBeforeUnmount(() => {
    socket.emit('leave-room',orderId)
})

async function sendMessage() {
    await axios.post(`/chat/order/${orderId}/messages`, {
        sender: useAccountStore.user._id,
        message: message.value
    })
    form.value.reset()
}

function isMessageBelongSender(messageId) {
    return messageId == useAccountStore.user._id
}
</script>

<template lang="pug">
.body(v-if="isHavePermission")
  .chat(v-if="chat")
    v-card.card(
    v-if="messages"
    class="overflow-y-auto"
    max-height="650"
    min-height="650"
    )
      v-card-text.messages
        div(v-for="message in messages" :key="message._id")
          div.container.rounded-xl(v-if=" isMessageBelongSender(message.sender._id)")
            img(src="https://thicc.mywaifulist.moe/waifus/554/5c01014e09976442d991d0913bdb3c7f28e4f17be08fcb39e4e8dc67cc043fe5_thumb.png")
            p(:id="message._id") {{ message.message }}
            span.time-right {{ message.createdAt }}
          div(v-else).container.darker.rounded-xl
            img.right(src="https://avatarfiles.alphacoders.com/186/186514.jpg")
            p {{ message.sender.name }} :  {{ message.message }}
            span.time-left {{ message.createdAt }}
    v-form(ref='form' @submit.prevent="sendMessage()").message-input
      v-text-field(
        v-model='message' :rules='messageRules' :counter='200' label='Message' required)
      v-btn(
        ref="sendMessageButton"
        color='primary' @click='sendMessage') Send
  .order Order: {{ chat.order }}
  h1.participants  Participants: {{ chat.participants }}

div(v-else) iznin yok
</template>

<style scoped>

.container {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}

.darker {
  border-color: #ccc;
  background-color: #ddd;
}
.container::after {
  content: "";
  clear: both;
  display: table;
}
.container img {
  float: left;
  max-width: 60px;
  margin-right: 20px;
  border-radius: 50%;
}
.container img.right {
  float: right;
  margin-right:0;
}

.time-right {
  float: right;
  color: #aaa;
}

.time-left {
  float: left;
  color: #999;
}
.body {
    align-content: center;
    width: 2500px;
    height: 100%;
    padding: 4rem;
    display: grid;
    grid-template-columns: repeat(8,1fr);
    grid-template-rows: repeat(2,1fr);
    grid-gap: 3rem;
    grid-template-areas:
    "chat chat chat chat order order order order"
    "chat chat chat chat order order order order"
    "chat chat chat chat participants participants participants participants";
}
.chat {
    grid-area: chat;
}
.order {
    grid-area: order;
}
.participants {
    grid-area: participants;
}
.card {
    background-color: rgb(101, 109, 116);
}
.messages {
    display: flex;
    flex-direction: column-reverse;
}
</style>

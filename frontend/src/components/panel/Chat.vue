<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { useOrders } from '@/store/orders'
import { useAccount } from '@/store/account'

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

const useAccountStore = useAccount()
const useOrdersStore = useOrders()
const booster = ref(null)
const loading = ref(false)
const user = ref(null)
const newMessage = ref('')
const messages = ref([])
const socket = useOrdersStore.getSocket

socket.on('chat updated' + props.order._id, (arg) => {
    if(arg.sender._id === useAccountStore.user._id ) return
    messages.value.unshift(arg)
})

onMounted(() => {
  axios.get(`/user/${props.order.customer}`).then((res) => {
    user.value = res.data
  })

  if(props.order.booster) {
    axios.get(`/user/${props.order.booster}`).then((res) => {
      booster.value = res.data
    })
  }

  useOrdersStore.joinChat(props.order._id)

  axios.get(`/message/chat/${props.order._id}`).then((res) => {
    messages.value = res.data
    loading.value = true
  })

})

onBeforeUnmount(() => {
    useOrdersStore.leaveChat(props.order._id)
})

function sendMessage() {
  if (newMessage.value) {
    axios.post('/message', {
      order: props.order._id,
      sender: useAccountStore.user._id,
      message: newMessage.value
    }).then((res) => {
      messages.value.unshift({
        order: props.order._id,
        sender: useAccountStore.user,
        message: newMessage.value
      })

      newMessage.value = ''
    })
  }
}

</script>

<template lang="pug">
.chat(v-if="loading")
  .chat-informations(v-if="useAccountStore.isBooster" )
    .row
      img.profile-photo(:src="user.photo" alt="profile-photo")
      .name {{ user.name }}
    img.chat-icon(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/chat.webp" alt="chat-icon")
  .chat-informations(v-else-if="order.booster" )
    .row
      img.profile-photo(:src="booster.photo" alt="profile-photo")
      .name {{ booster.name }}
    img.chat-icon(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/chat.webp" alt="chat-icon")
  .chat-informations(v-else)
    .row
      img.profile-photo(src="https://repository-images.githubusercontent.com/423180394/51fb7f2b-0bb0-4c3e-a06c-840fa3a910eb" alt="profile-photo")
      .name ARCHMAGE (BOT)
    img.chat-icon(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/chat.webp" alt="chat-icon")
  .little-divider
  .live-chat
    .messages
      .message(v-for="message in messages" :key="message._id" :class=" (message.sender._id === useAccountStore.user._id) ? 'my-message' : 'not-my-message'")
        img.profile-photo(:src="message.sender.photo" alt="profile-photo")
        .message-content {{ message.message }}
  v-text-field(v-model="newMessage" label="Message" @keyup.enter="sendMessage")
</template>

<style scoped>
.chat {
  height: 967px;
  border-radius: 10px;
  padding: 25px 0 29px;
  border: solid 1px #eee;

}
.row {
  display: flex;
  align-items: center;
  gap: 30px;
}
.chat-informations {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
}
.profile-photo {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  border: solid 1px #171120;
}
.name {
  font-size: 24px;
  font-weight: bold;
  color: #000;
  text-transform: uppercase;
}
.chat-icon {
  width: 42px;
  height: 42px;
}
.little-divider {
  height: 1px;
  background-color: #eee;
}

.messages {
  display: flex;
  flex-direction: column-reverse;
  height: 770px;
  padding: 2rem;
  overflow-y: auto;
  gap: 2rem;
}
.message {
  display: flex;
  gap: 24px;
}
.my-message {
  align-self: flex-end;
  flex-direction: row-reverse;
}
.not-my-message {
  align-self: flex-start;
}
.message-content {
  padding: 1rem;
  border-radius: 12px;
  background-color: #f5f5f5;
  min-width: 170px;
  max-width: 350px;
  word-break: break-all;
}
/*
.messages::-webkit-scrollbar {
    display: none; /* Chrome, Safari ve diğer WebKit tarayıcılar için
}
*/
</style>
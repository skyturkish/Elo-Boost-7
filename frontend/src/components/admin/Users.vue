<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const users = ref(null)

onMounted(() => {
  axios.get('/user').then(res => {
    users.value = res.data
  })
})
</script>

<template lang="pug">
.loading(v-if="users == null") Loading
.users(v-else)
  .user(v-for="user in users")
    img.avatar(:src='user.photo' :alt="user.name")
    .user__name name: {{ user.name }}
    .user__id id: {{ user._id }}
    .user__role role: {{ user.role }}

    v-btn(@click="router.push(`/admin/user/${user._id}`)") Edit User
</template>

<style scoped>
.avatar {
  width: 50px;
}
.users {
  display:flex;
  flex-wrap: wrap;
  gap: 3rem;
  padding: 3rem;
  justify-content: space-around;
  width: 1440px;
}
.user {
  width: 400px;
  background-color: rgb(103, 95, 84);
}
</style>
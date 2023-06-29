<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const users = ref(null)

onMounted(() => {
  axios.get('/user/role/customer').then(res => {
    users.value = res.data
  })
})
</script>

<template lang="pug">
.loading(v-if="users == null") Loading
.users(v-else)
  .user(v-for="user in users")
    v-img(:src='user.photo' width="50px")
    .user__name(v-text="user.name")
    .user__id(v-text="user._id")
    v-btn(@click="router.push(`/admin/user/${user._id}`)") Edit User
</template>

<style scoped>
.users {
  display:flex;
  flex-wrap: wrap;
}
.user {
  width: 400px;
  background-color: rgb(103, 95, 84);
}
</style>
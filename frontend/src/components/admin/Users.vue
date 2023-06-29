<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref(null)

onMounted(async () => {
  axios.get('/user/role/customer').then(res => {
    users.value = res.data
  })
})

</script>

<template lang="pug">
.loading(v-if="users == null") Loading
.users(v-else)
  .user(v-for="user in users")
    .user__name(v-text="user.name")
    .user__email(v-text="user.email")
    .user__id(v-text="user._id")

</template>

<style scoped>
.users {
  display:flex
}
.user {
  height: 100px;
  width: 400px;
  background-color: rgb(103, 95, 84);
}
</style>

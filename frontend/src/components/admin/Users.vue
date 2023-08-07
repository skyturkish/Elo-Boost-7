<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const users = ref(null)
const searchName = ref('')

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    return user.name.toLowerCase().includes(searchName.value.toLowerCase())
  })
})

onMounted(() => {
  axios.get('/user').then(res => {
    users.value = res.data
  })
})
</script>

<template lang="pug">
.loading(v-if="users == null") Loading
div(v-else)
  v-text-field(v-model="searchName" label="Search for users")
  .users(v-if="users.length > 0")
    .user(v-if="filteredUsers.length > 0" v-for="user in filteredUsers")
      img.avatar(:src='user.photo' :alt="user.name")
      .user__name name: {{ user.name }}
      .user__id id: {{ user._id }}
      .user__role role: {{ user.role }}
      v-btn(@click="router.push(`/admin/user/${user._id}`)") Edit User
    h1(v-else) There are no users by this name check your search
  h1(v-else) There is no user in database
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
  background-color: rgb(177, 170, 159);
}
</style>
<script setup>
import { ref } from 'vue'
import { useAccount } from '@/store/account'
import { useRouter } from 'vue-router'

const router = useRouter()
const useAccountStore = useAccount()
const menu = ref(false)

const links = [
  {
    name: 'DASHBOARD',
    path: '/panel/dashboard'
  },
  {
    name: 'EDIT PROFILE',
    path: '/edit-profile'
  },
  {
    name: 'TRANSACTIONS',
    path: '/transactions'
  },
  {
    name: 'CREDENTIALS',
    path: '/credentials'
  }
]

async function logout() {
  await useAccountStore.logout()
}
</script>

<template lang="pug">
v-menu(v-if="useAccountStore.user" v-model="menu" :close-on-content-click="false")
  template(v-slot:activator='{ props }')
    v-img.profile(v-bind="props" :src="useAccountStore.user.photo")
  .menu
    .link(v-for="link in links" :key="link.name" @click="router.push(link.path)") {{ link.name }}
    .logout(@click="logout") LOG OUT
</template>

<style scoped>
.menu {
  height: 200px;
  width: 150px;
  background-color: #F9F9F9;
  color: #171120;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  font-weight: bold;
  gap: 20px;
  padding: 1.5rem 1.7rem;
  font-size: 12px;
  line-height: normal;
}

.logout,
.link {
  cursor: pointer;
}
.profile {
  width: 50px;
  height: 50px;
  border-radius: 15px;
  cursor: pointer;
}
</style>

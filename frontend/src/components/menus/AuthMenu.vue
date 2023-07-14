<script setup>
import { ref } from 'vue'
import { useAccount } from '@/store/account'
import { useRouter, useRoute  } from 'vue-router'

const route = useRoute()
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
  const rootPathName = route.fullPath.split('/')[1]

  if (rootPathName == 'panel' || rootPathName == 'edit-profile') {
    await router.push('/')
  }
  await useAccountStore.logout()
}
</script>

<template lang="pug">
v-menu(v-if="useAccountStore.user" v-model="menu" :close-on-content-click="false")
  template(v-slot:activator='{ props }')
    img.profile(v-bind="props" :src="useAccountStore.user.photo" alt="profile")
  .menu
    .link(v-for="link in links" :key="link.name" @click="router.push(link.path)") {{ link.name }}
    .logout(@click="logout") LOG OUT
</template>

<style scoped>
.menu {
  width: 150px;
  background-color: #F9F9F9;
  color: #171120;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  font-weight: bold;
  font-size: 12px;
  line-height: normal;
}

.logout,
.link {
  cursor: pointer;
  padding: 0.75rem 0.85rem;
  border-radius: 8px;


}
.logout:hover,
.link:hover {
  cursor: pointer;
  background-color: #E7CFCF;

}
.profile {
  width: 50px;
  height: 50px;
  border-radius: 15px;
  cursor: pointer;
}
</style>

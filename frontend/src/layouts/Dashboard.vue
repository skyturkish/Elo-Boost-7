<script setup>
import { ref } from 'vue'

import { useAccount } from '@/store/account'

import { useRouter } from 'vue-router'

const drawer = true

const router = useRouter()

const useAccountStore = useAccount()

const selectedMenuItem = ref('My Orders (Customer)')

const menuItems = [
  {
    title: 'Profile',
    icon: 'mdi-clipboard-account',
    path: '/profile',
  },
  {
    title: 'My Orders (Customer)',
    icon: 'mdi-send',
    path: '/my-orders-customer',
  },
  {
    title: 'My Orders (Booster)',
    icon: 'mdi-send',
    onlyBooster: true,
    path: '/my-orders-booster',

  },
  {
    title: 'All Orders',
    icon: 'mdi-send',
    onlyBooster: true,
    path: '/all-orders',
  },
]

async function logout() {
  await useAccountStore.logout()
  router.push('/')
}
</script>

<template lang="pug">
v-app(
  v-if="useAccountStore.user"
  id='inspire')
  v-navigation-drawer(
    permanent
    v-model='drawer')
    v-sheet.pa-4(color='grey-lighten-4')
      v-avatar.mb-4(image="https://i.pinimg.com/474x/9d/49/96/9d4996efe343c725e2bbd39c3d79bb23.jpg" color='grey-darken-1' size='64')
      div {{ useAccountStore.user.email }}
      div {{ useAccountStore.user.name }}
    v-divider
    v-list
      v-list-item(
        v-for = 'menuItem in menuItems.filter(item => item.onlyBooster ? useAccountStore.user.role == "booster" : true)'
        :to="menuItem.path" @click="selectedMenuItem = menuItem.title"
        link='')
        template( v-slot:prepend='')
          v-icon {{ menuItem.icon }}
        v-list-item-title {{ menuItem.title }}
      v-list-item(
        @click="logout()"
        link='')
        template(v-slot:prepend='')
          v-icon mdi-logout
        v-list-item-title logout
  v-main.main
    router-view()
</template>

<style scoped>
.main {
  background-color: rgb(40, 36, 54);
}

</style>
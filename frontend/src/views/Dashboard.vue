<script setup>
import { ref } from 'vue'

import { useAccount } from '@/store/account'

import AllOrders from '@/views/AllOrders'

import StaticOrders from '@/components/order/StaticOrders'

import { useRouter } from 'vue-router'

const drawer = true

const router = useRouter()

const useAccountStore = useAccount()

const selectedMenuItem = ref('My Orders (Customer)')

const menuItems = [
  {
    title: 'My Orders (Customer)',
    icon: 'mdi-send',
  },
  {
    title: 'My Orders (Booster)',
    icon: 'mdi-send',
    onlyBooster: true,

  },
  {
    title: 'All Orders',
    icon: 'mdi-send',
    onlyBooster: true,
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
        @click="selectedMenuItem = menuItem.title"
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
  v-main
    StaticOrders(v-if="selectedMenuItem == 'My Orders (Customer)'" :ordersURL="`/order/customer/${useAccountStore.user._id}`")
    StaticOrders(v-if="selectedMenuItem == 'My Orders (Booster)'" :ordersURL="`/order/booster/${useAccountStore.user._id}`")
    AllOrders(v-if="selectedMenuItem == 'All Orders'")
</template>

<style scoped>

</style>
<script setup>
import PanelBanner from '@/components/PanelBanner'

import { useAccount } from '@/store/account'

const useAccountStore = useAccount()

const menuItems = [
  {
    title: 'Dashboard',
    icon: 'mdi-monitor-dashboard',
    path: 'dashboard',
  },
  {
    title: 'Boosting',
    icon: 'mdi-gamepad-variant-outline',
    path: 'boosting-current-offers',
    subItems: [
      {
        title: 'AVAILABLE OFFERS',
        path: 'boosting-available-offers',
      },
      {
        title: 'CURRENT ORDERS',
        path: 'boosting-current-offers',
      },
    ],
  },
  {
    title: 'Coaching',
    icon: 'mdi-human-male-board-poll',
    path: 'coaching-current-offers',
    subItems: [
      {
        title: 'AVAILABLE OFFERS',
        path: 'coaching-available-offers',
      },
      {
        title: 'CURRENT ORDERS',
        path: 'coaching-current-offers',
      },
    ],
  },
  {
    title: 'Account Market',
    icon: 'mdi-shopping-outline',
    path: 'account-market',
  },
  {
    title: 'Hub',
    icon: 'mdi-account-box-outline',
    path: 'hub',
  }
]
</script>

<template lang="pug">
PanelBanner
v-divider.border-opacity-100(thickness="1rem" v-bind:style="{ borderColor: useAccountStore.user.themePreference.color }")
.panel
  .routers-select
    v-list
      v-list-item(v-for='menuItem in menuItems' :key='menuItem.title' :value='menuItem' active-color='#bc2842' variant='plain' :to='`${menuItem.path}`')
        template(v-slot:prepend='')
          v-icon(:icon='menuItem.icon')
        v-list-item-title(v-text='menuItem.title')
  router-view()
  .empty
</template>

<style scoped>
.panel {
  display: flex;
  justify-content: space-between;
}
.routers-select {
  background-color: #f9f9f9;
  max-height: 125rem;
}
.v-list-item {
  height: 4.4rem;;
  background-color: #fff;
  font-family: Inter;
  font-size: 26px;
}
.v-list-item--variant-plain:focus{
    color: #bc2842;
}
.v-list-item--variant-plain {
    opacity: 1;
}
</style>
<script setup>
import Banner from '@/components/Banner'
const menuItems = [
  {
    title: 'Dashboard',
    icon: 'mdi-monitor-dashboard',
    path: 'dashboard',
  },
  {
    title: 'Boosting',
    icon: 'mdi-gamepad-variant-outline',
    path: 'boosting-available-offers',
    subItems: [
      {
        title: 'AVAILABLE OFFERS',
        path: 'boosting-available-offers',
      },
      {
        title: 'CURRENT ORDERS',
        path: 'boosting-current-orders',
      },
    ],
  },
  {
    title: 'Coaching',
    icon: 'mdi-human-male-board-poll',
    path: 'coaching-available-offers',
    subItems: [
      {
        title: 'AVAILABLE OFFERS',
        path: 'coaching-available-offers',
      },
      {
        title: 'CURRENT ORDERS',
        path: 'coaching-current-orders',
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
Banner(splashArtPath = 'zed' title= '' subtitle= '')
v-divider.border-opacity-100(thickness="1rem")
.panel
  .routers-select
    v-list
      v-list-item(v-for='menuItem in menuItems' :key='menuItem.title' :value='menuItem' active-color='red' variant='plain' :to='`${menuItem.path}`')
        template(v-slot:prepend='')
          v-icon(:icon='menuItem.icon')
        v-list-item-title(v-text='menuItem.title')
  router-view()
</template>

<style scoped>
.panel {
  max-width: 1440px;
  margin: 0 auto;
  display: flex
}
.routers-select {
  background-color: #f9f9f9;
  width: 16rem;
  max-height: 125rem;
}
.v-list-item--variant-plain:focus{
    color: #bc2842;
}
.v-divider {
  border-color: #BC2842 !important;
}
</style>
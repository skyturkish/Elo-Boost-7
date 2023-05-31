<script setup>
import Banner from '@/components/Banner'

// import { ref } from 'vue'

// import { useAccount } from '@/store/account'

// import { useRouter } from 'vue-router'

// const router = useRouter()

// const drawer = true

// const useAccountStore = useAccount()

// const selectedMenuItem = ref('My Orders (Customer)')

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

// async function logout() {
//   await useAccountStore.logout()
//   router.push('/')
// }

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
  .a


//- v-app(
//-   v-if="useAccountStore.user"
//-   id='inspire')
//-   v-navigation-drawer(
//-     permanent
//-     v-model='drawer')
//-     v-sheet.pa-4(color='grey-lighten-4')
//-       v-avatar.mb-4(image="https://i.pinimg.com/474x/9d/49/96/9d4996efe343c725e2bbd39c3d79bb23.jpg" color='grey-darken-1' size='64')
//-       div {{ useAccountStore.user.email }}
//-       div {{ useAccountStore.user.name }}
//-     v-divider
//-     v-list
//-       v-list-item(
//-         v-for = 'menuItem in menuItems.filter(item => item.onlyBooster ? useAccountStore.user.role == "booster" : true)'
//-         :to="menuItem.path" @click="selectedMenuItem = menuItem.title"
//-         link='')
//-         template( v-slot:prepend='')
//-           v-icon {{ menuItem.icon }}
//-         v-list-item-title {{ menuItem.title }}
//-       v-list-item(
//-         @click="logout()"
//-         link='')
//-         template(v-slot:prepend='')
//-           v-icon mdi-logout
//-         v-list-item-title logout
//-   v-main.main
//-     router-view()
</template>

<style scoped>
.panel {
  display: flex;
  justify-content: space-between;
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
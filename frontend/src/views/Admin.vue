<script setup>
import { useAccount } from '@/store/account'
import { useRouter } from 'vue-router'

const router = useRouter()
const useAccountStore = useAccount()

</script>

<template lang="pug">
Banner(splashArtPath = 'heimerdinger' title = 'ADMIN' subtitle = "Don't ban yasuo players")
v-divider.border-opacity-100(thickness="1rem")
.panel
  .routers-select
    v-list
      v-list-item(to='/admin/users')
        template(v-slot:prepend='')
          v-icon(icon='mdi-account')
        v-list-item-title(v-text='`Users`')
      v-list-item(to='/admin/reports')
        template(v-slot:prepend='')
          v-icon(icon='mdi-alert')
        v-list-item-title(v-text='`Reports`')
      //- v-list-item(to='/panel/your-coaching-orders')
      //-   template(v-slot:prepend='')
      //-     v-icon(icon='mdi-human-male-board-poll')
      //-   v-list-item-title(v-text='`Coaching`')
      //- v-list-item(to='/panel/account-market')
      //-   template(v-slot:prepend='')
      //-     v-icon(icon='mdi-shopping-outline')
      //-   v-list-item-title(v-text='`Account-Market`')
      //- v-list-item(to='/panel/hub')
      //-   template(v-slot:prepend='')
      //-     v-icon(icon="mdi-account-box-outline")
      //-   v-list-item-title(v-text='`Hub`')
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
  min-width: 212px;
}
.v-list-item {
  height: 4.4rem;

}
.v-list-item {
  font-size: 16px;
  font-weight: bold;
}
</style>

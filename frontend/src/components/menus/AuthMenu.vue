<script setup>
import { ref} from 'vue'
import { useAccount } from '@/store/account'
import { useRouter } from 'vue-router'

const router = useRouter()

const useAccountStore = useAccount()

const menu = ref(false)

async function logout() {
  await useAccountStore.logout()
}
</script>

<template lang="pug">
v-menu(
  v-model="menu"
  :close-on-content-click="false"
  v-if="useAccountStore.user")
  template(v-slot:activator='{ props }')
    v-img.profile(v-bind="props" src="../../assets/profiles/profile-ahri.png")
  v-card.card(min-width='300')
    v-list()
      v-list-item(prepend-avatar="https://i.pinimg.com/474x/9d/49/96/9d4996efe343c725e2bbd39c3d79bb23.jpg" :title="useAccountStore.user.role" :subtitle="useAccountStore.user.name")
    h4 Balance: {{ useAccountStore.user.balance }}
    v-divider()
    v-btn(
      prepend-icon="mdi-view-dashboard"
      variant="outlined"
      @click="router.push('/dashboard/my-orders-customer')"
    ) Dashboard
    v-btn(
      prepend-icon="mdi-logout"
      variant="outlined"
      @click="logout()"
    ) Logout
</template>

<style scoped>
.profile {
  width: 50px;
  height: 50px;
  border-radius: 15px;
  cursor: pointer;
}
.card{
  padding: 1rem;
  display:flex;
  flex-direction: column;
  gap: 0.25rem;
}
</style>

<script setup>
import { onMounted} from 'vue'
import { useAccount } from '@/store/account'

const useAccountStore = useAccount()

onMounted(() => {
  useAccountStore.fetchSession()
})
</script>

<template>
  <router-view />
</template>

<style>
.v-btn--active > .v-btn__overlay, .v-btn[aria-haspopup=menu][aria-expanded=true] > .v-btn__overlay {
   opacity: 0.01 !important;
}
</style>
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

<script setup>
import AppBar from '@/components/Appbar'
import { useAccount } from '@/store/account'

const useAccountStore = useAccount()

</script>

<template lang="pug">
.background(:style="{ backgroundImage: `url(https://storage.googleapis.com/divine-boost-bucket/assets/assets/banners/${useAccountStore.user.themePreference.path}.webp)` , backgroundPositionY: useAccountStore.user.themePreference.backgroundPositionY }")
  .content
    AppBar
</template>

<style scoped>
.background {
  background-size: cover;
}
.content {
  display:flex;
  flex-direction: column;
  max-width: 1840px;
  min-width: 960px;
  margin: 0 auto;
  padding: 42px 40px 30px 45px;
  height: 542px;
}
</style>
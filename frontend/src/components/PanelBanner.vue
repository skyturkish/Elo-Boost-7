<script setup>
import AppBar from '@/components/Appbar'
import { useAccount } from '@/store/account'

const useAccountStore = useAccount()

</script>

<template lang="pug">
v-img.image(cover :src='`../../src/assets/banners/${useAccountStore.user.themePreference.path}.png`')
  .content
    AppBar
</template>

<style scoped>
.image {
  max-height: 540px;
  margin: 0 auto;
}
.content {
  display:flex;
  flex-direction: column;
  max-width: 1840px;
  min-width: 960px;
  margin: 0 auto;
  padding: 42px 40px 30px 45px;
}
</style>
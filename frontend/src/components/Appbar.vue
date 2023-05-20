<script setup>
import Logo from '@/components/main/appbar-components/Logo'
import ClientAreaButton from '@/components/ClientAreaButton'
import SettingsButton from '@/components/main/appbar-components/SettingsButton'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template lang="pug">
.appbar
  Logo
  .navigation-and-buttons
    .navigations
      v-btn.navigation-text(variant="text" @click="router.push('/boosting/valorant/division')") BOOSTING
      v-btn.navigation-text(variant="text" @click="router.push('/coaching/league-of-legends/lesson')") COACHING
      v-btn.navigation-text(variant="text" @click="router.push('/marketplace')") MARKETPLACE
    .buttons
      ClientAreaButton
      SettingsButton
</template>

<style scoped>
.appbar {
  display: flex;
  justify-content: space-between;
  font-family: Inter;
}
.navigation-and-buttons {
  display: flex;
  gap: 1rem;
}
.navigations {
  display: flex;
  gap: 1.2rem;
  padding-top: 0.5rem;
}
.buttons > * {
  margin-left: 1rem;
}
.navigation-text {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: normal;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  color: #fff;
}
@media (max-width: 959px) {
  .navigation-text {
    font-size: 16px;
  }
}
@media (min-width: 960px) and (max-width: 1263px) {
  .navigation-text {
    font-size: 20px;
  }
}
@media (min-width: 1264px) and (max-width: 1903px) {
  .navigation-text {
    font-size: 24px;
  }
}
</style>
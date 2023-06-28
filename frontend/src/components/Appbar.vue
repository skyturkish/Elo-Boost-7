<script setup>
import LoginButton from '@/components/LoginButton'
import SettingsButton from '@/components/main/appbar-components/SettingsButton'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template lang="pug">
.appbar
  v-btn.logo(variant="tonal" @click="router.push('/')")
  .navigation-and-buttons
    .navigations
      .navigation-text(variant="text" @click="router.push('/boosting/league-of-legends/division')") BOOSTING
      .navigation-text(variant="text" @click="router.push('/coaching/league-of-legends/lesson')") COACHING
      .navigation-text(variant="text" @click="router.push('/marketplace')") MARKETPLACE
    .buttons
      LoginButton
      SettingsButton
</template>

<style scoped>
.appbar {
  display: flex;
  justify-content: space-between;
  font-family: Inter;
}
.logo {
    width: 9.25rem;
    height: 9.25rem;
    border-radius: 1.6rem;
    background-color: #d9d9d9;
}
.navigation-and-buttons {
  display: flex;
  gap: 1rem;
}
.navigations {
  display: flex;
  gap: 3rem;
  padding-top: 0.5rem;
  padding-right: 2rem;
}
.buttons {
  display: flex;
  gap: 1rem;
}
.navigation-text {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: normal;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  color: #fff;
  height: min-content;
}
.navigation-text:hover {
  cursor: pointer;
  text-shadow: 0 8px 4px rgba(0, 0, 0, 0.25);

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
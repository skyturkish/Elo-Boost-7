<script setup>
import LoginButton from '@/components/LoginButton'
import { useRouter } from 'vue-router'
import Online from '@/components/indicators/Online'

const router = useRouter()

</script>

<template lang="pug">
.appbar
  img.logo(src="@/assets/icons/logo.png"  @click="router.push('/')")
  .navigation-and-buttons
    .navigations
      div.row
        .online
          Online
        .navigation-text ONLINE
      .navigation-text(variant="text" @click="router.push('/boosting/league-of-legends/division')") BOOSTING
      .navigation-text(variant="text" @click="router.push('/coaching/league-of-legends/lesson')") COACHING
      .navigation-text(variant="text" @click="router.push('/marketplace')") MARKETPLACE
    .buttons
      LoginButton
      .settings
        v-icon(icon="mdi-cog" color="#444")
</template>

<style scoped>
.online {
  padding-top: 0.5rem;
}
.row {
  display: flex;
  gap: 1rem;
  height: min-content;
}
.appbar {
  display: flex;
  justify-content: space-between;
  font-family: Inter;
}
.logo {
  height: 93px;
  width: 220px;
  cursor: pointer;
  opacity: 0.9;
  margin-bottom: 5rem;
}
.logo:hover {
  opacity: 1;
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
.settings {
    width: 50px;
    height: 50px;
    border-radius: 15px;
    background-color: #e4e6e7;
    cursor: pointer;
}
.v-icon {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
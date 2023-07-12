<script setup>
import NormalGameCard from '@/components/boosting/league-of-legends/NormalGameCard'
import Checkout from '@/components/Checkout'
import SelectServer from '@/components/boosting/league-of-legends/SelectServer'
import SelectClashTier from '@/components/boosting/league-of-legends/SelectClashTier'
import SelectClashAmountBooster from '@/components/boosting/league-of-legends/SelectClashAmountBooster'
import SelectClashAmountGames from '@/components/boosting/league-of-legends/SelectClashAmountGames'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

async function createOrder() {
  await useLeagueOfLegendsOrder().createClashOrder()
}

</script>

<template lang="pug">
.a
  img.crown(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/crowns/clash.webp" alt="crown")
  .normal-game-card
    img.logo(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/crowns/clash-logo.webp" alt="crown-logo")
    .game-name CLASH
    .selections
      SelectServer
      SelectClashTier
      SelectClashAmountBooster
      SelectClashAmountGames
Checkout(checkoutTextColor="#000747" v-on:create-order="createOrder")
</template>

<style scoped>

.crown {
  margin: 0 auto;
  margin-bottom: -4rem;
  height: 7rem;
  margin-top: -1rem;
  width: 26.7rem;
}
.normal-game-card {
  width: 22.5rem;
  border-radius: 15px;
  margin: 0 auto;
  background-color: #fff;
  height: 42rem;
  border: solid 2px #980092;
}
.logo {
  height: 15.625rem;
  width: 15.625rem;
  margin-left: 16.5%;
  margin-top: 4rem;
}
.game-name {
  font-weight: bold;
  margin-top: 23px;
  text-align:center;
  font-size: 2rem;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  color: #93006A;
  background-color: '#FBF8FA';
  margin-bottom: 2rem;
}
.colors {
  display: flex;
  margin-top: 3rem;
  justify-content: center;
  align-items: center;
  gap: 0.90rem;
}
.selections {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.selections > * {
  width: 50%;
}
</style>

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
.clash
  .a
    .crown-background
      v-img.crown(src="../../../assets/crowns/clash.png")
    .normal-game-card
      .change-logo-and-logo
        v-img.logo(src="../../../assets/crowns/clash-logo.png")
      .game-name CLASH
      .selections
        SelectServer
        SelectClashTier
        SelectClashAmountBooster
        SelectClashAmountGames
  Checkout(v-on:create-order="createOrder")
</template>

<style scoped>
.clash {
  display: flex;
  justify-content: center;
  max-width: 1440px;
  margin: 0 auto;
  flex-wrap: wrap;
  background-color: #eeeeee;
  padding: 0 2.75rem;
}
.crown{
  margin: 0 auto;
  margin-bottom: -4rem;
}
.crown-background {
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
.change-logo-and-logo {
  display: flex;
  align-items: center;
}
.game-name {
  font-weight: bold;
  margin-top: 23px;
  text-align:center;
  font-size: 2rem;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  color: #93006A;
  background-color: '#F8FBF8';
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

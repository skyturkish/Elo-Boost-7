<script setup>
import NormalGameCard from '@/components/boosting/league-of-legends/NormalGameCard'
import Checkout from '@/components/Checkout'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

async function createOrder() {
  await useLeagueOfLegendsOrder().createNormalGamesOrder()
}
</script>

<template lang="pug">
.normal-game
  NormalGameCard
  Checkout(v-on:create-order="createOrder")
</template>

<style scoped>
.normal-game {
  display: flex;
  justify-content: center;
  max-width: 1440px;
  margin: 0 auto;
  flex-wrap: wrap;
  padding: 0 2.75rem;
}
</style>

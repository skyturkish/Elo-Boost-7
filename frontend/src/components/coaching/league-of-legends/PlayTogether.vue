<script setup>
import CurrentRank from '@/components/boosting/league-of-legends/CurrentRank'
import SelectLanguages from '@/components/coaching/league-of-legends/SelectLanguages'
import Checkout from '@/components/Checkout'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

async function createOrder() {
  await currentLeagueOfLegendsOrder.createPlayTogetherOrder()
}
</script>

<template lang="pug">
CurrentRank(divisionLimit = 6 title = "YOUR RANK")
  v-select(v-model="currentLeagueOfLegendsOrder.coachingGamesAmount" :items="['1 GAMES', '2 GAMES', '3 GAMES', '4 GAMES', '5 GAMES']" )
  SelectLanguages
Checkout(v-on:create-order="createOrder")
</template>

<style scoped>
</style>

<script setup>
import CurrentRank from '@/components/boosting/league-of-legends/CurrentRank'
import SelectLanguages from '@/components/coaching/league-of-legends/SelectLanguages'
import SelectCoachAmountGame from '@/components/coaching/league-of-legends/SelectCoachAmountGame'
import SelectCoach from '@/components/coaching/league-of-legends/SelectCoach'
import SelectChampions from '@/components/boosting/league-of-legends/SelectChampions'
import Premium from '@/components/boosting/league-of-legends/Premium'

import Checkout from '@/components/Checkout'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

async function createOrder() {
  await currentLeagueOfLegendsOrder.createLiveGameOrder()
}
</script>

<template lang="pug">
CurrentRank(divisionLimit = 6 title = "YOUR RANK")
  SelectCoachAmountGame
  SelectLanguages
Checkout(checkoutTextColor="#2B2D3D" v-on:create-order="createOrder")
  template(v-slot:options)
    SelectCoach
    SelectChampions
    Premium
</template>

<style scoped>
</style>

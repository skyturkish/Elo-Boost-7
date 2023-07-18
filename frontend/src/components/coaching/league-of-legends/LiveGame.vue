<script setup>
import CurrentRank from '@/components/boosting/league-of-legends/CurrentRank'
import SelectLanguages from '@/components/coaching/league-of-legends/SelectLanguages'
import SelectCoachAmountGame from '@/components/coaching/league-of-legends/SelectCoachAmountGame'
import SelectCoach from '@/components/coaching/league-of-legends/SelectCoach'
import SelectChampions from '@/components/boosting/league-of-legends/SelectChampions'
import Premium from '@/components/boosting/league-of-legends/Premium'
import Checkout from '@/components/Checkout'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

async function createOrder() {
  router.push({
    path: `/complete-payment/league-of-legends/live-game`,
  })
}
</script>

<template lang="pug">
CurrentRank(divisionLimit = 7 title = "YOUR RANK")
  SelectCoachAmountGame
  SelectLanguages
Checkout(checkoutTextColor="#2B2D3D" v-on:create-order="createOrder" :order='currentLeagueOfLegendsOrder.liveGameOrder')
  template(v-slot:options)
    SelectCoach
    SelectChampions
    Premium
</template>

<style scoped>
</style>

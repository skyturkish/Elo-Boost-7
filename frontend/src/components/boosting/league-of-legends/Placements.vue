<script setup>
import CurrentMilestones from '@/components/boosting/league-of-legends/CurrentMilestones'
import SelectServer from '@/components/boosting/league-of-legends/SelectServer'
import SelectQueue from '@/components/boosting/league-of-legends/SelectQueue'
import SelectPlacementsGamesAmount from '@/components/boosting/league-of-legends/SelectPlacementsGamesAmount'
import Checkout from '@/components/Checkout'
import CurrentRank from '@/components/boosting/league-of-legends/CurrentRank'
import CustomSwitch from '@/components/CustomSwitch'
import BonusWin from '@/components/boosting/league-of-legends/BonusWin'
import Premium from '@/components/boosting/league-of-legends/Premium'
import HighMmrAndSoloOnly from '@/components/boosting/league-of-legends/HighMmrAndSoloOnly'
import UntrackableOrStream from '@/components/boosting/league-of-legends/UntrackableOrStream'
import SelectBooster from '@/components/boosting/league-of-legends/SelectBooster'
import SelectChampions from '@/components/boosting/league-of-legends/SelectChampions'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

async function createOrder() {
  router.push({
    path: `/complete-payment/league-of-legends/placements`,
  })
}
</script>

<template lang="pug">
CurrentRank(divisionLimit = 9 title = "LAST SEASON")
  .selections-layout
    SelectServer
    SelectQueue
    SelectPlacementsGamesAmount
Checkout(checkoutTextColor="#000747" v-on:create-order="createOrder")
  template(v-slot:options)
    SelectBooster
    SelectChampions
    BonusWin
    Premium
    HighMmrAndSoloOnly
    UntrackableOrStream
  template(v-slot:switchs)
    .custom-switch-two-options
      .choice SOLO
      CustomSwitch(v-model="currentLeagueOfLegendsOrder.isSolo")
      .choice DUO
</template>

<style scoped>
.selections-layout {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.selections-layout > * {
  width: 50%;
}
</style>

<script setup>
// Components
import CurrentRank from '@/components/boosting/league-of-legends/CurrentRank'
import CurrentMilestones from '@/components/boosting/league-of-legends/CurrentMilestones'
import SelectServer from '@/components/boosting/league-of-legends/SelectServer'
import SelectQueue from '@/components/boosting/league-of-legends/SelectQueue'
import SelectAmountWinGames from '@/components/boosting/league-of-legends/SelectAmountWinGames'
import SelectCurrentLP from '@/components/boosting/league-of-legends/SelectCurrentLP'
import SelectGainLP from '@/components/boosting/league-of-legends/SelectGainLP'
import Checkout from '@/components/Checkout'
import SelectBooster from '@/components/boosting/league-of-legends/SelectBooster'
import SelectChampions from '@/components/boosting/league-of-legends/SelectChampions'
import UntrackableOrStream from '@/components/boosting/league-of-legends/UntrackableOrStream'
import Premium from '@/components/boosting/league-of-legends/Premium'
import HighMmrAndSoloOnly from '@/components/boosting/league-of-legends/HighMmrAndSoloOnly'
import CustomSwitch from '@/components/CustomSwitch'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

async function createOrder() {
  router.push({
    path: `/complete-payment/league-of-legends/win`,
  })
}

</script>

<template lang="pug">
CurrentRank(divisionLimit = 9 title = "YOUR RANK")
  CurrentMilestones
  .selections-layout
    SelectServer
    SelectQueue
    SelectAmountWinGames
    SelectCurrentLP
    SelectGainLP
Checkout(checkoutTextColor="#000747" v-on:create-order="createOrder")
  template(v-slot:options)
    SelectBooster
    SelectChampions
    UntrackableOrStream
    Premium
    HighMmrAndSoloOnly
  template(v-slot:switchs)
    .custom-switch-two-options
      .choice GAME
      CustomSwitch(v-model="currentLeagueOfLegendsOrder.gameOrNetWin")
      .choice NET WIN
    .custom-switch-two-options
      .choice SOLO
      CustomSwitch(v-model="currentLeagueOfLegendsOrder.isSolo")
      .choice DUO

</template>

<style scoped>
.selections-layout {
  display: flex;
  flex-wrap: wrap;
}
.selections-layout > * {
  width: 33%;
}
</style>
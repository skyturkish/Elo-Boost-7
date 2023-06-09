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

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

async function createOrder() {
  await currentLeagueOfLegendsOrder.createPlacementsOrder(hours.value)
}
</script>

<template lang="pug">
.placements
  CurrentRank(divisionLimit = 9 title = "LAST SEASON" v-model="hours")
    .selections-layout
      SelectServer
      SelectQueue
      SelectPlacementsGamesAmount
  Checkout(v-on:create-order="createOrder")
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
.placements {
  display: flex;
  justify-content: center;
  max-width: 1440px;
  margin: 0 auto;
  flex-wrap: wrap;
  padding: 0 2.75rem;
}
.selections-layout {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.selections-layout > * {
  width: 50%;
}
</style>

<script setup>
import NormalGameCard from '@/components/boosting/league-of-legends/NormalGameCard'
import Checkout from '@/components/Checkout'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'
import SelectBooster from '@/components/boosting/league-of-legends/SelectBooster'
import SelectChampions from '@/components/boosting/league-of-legends/SelectChampions'
import Stier from '@/components/boosting/league-of-legends/Stier'
import Premium from '@/components/boosting/league-of-legends/Premium'
import HighMmrAndSoloOnly from '@/components/boosting/league-of-legends/HighMmrAndSoloOnly'
import UntrackableOrStream from '@/components/boosting/league-of-legends/UntrackableOrStream'
import CustomSwitch from '@/components/CustomSwitch'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

async function createOrder() {
  await currentLeagueOfLegendsOrder.createNormalGamesOrder()
}
</script>

<template lang="pug">
.normal-game
  NormalGameCard
  Checkout(v-on:create-order="createOrder")
    template(v-slot:options)
      SelectBooster
      SelectChampions
      Stier
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
.normal-game {
  display: flex;
  justify-content: center;
  max-width: 1440px;
  margin: 0 auto;
  flex-wrap: wrap;
  padding: 0 2.75rem;
}
</style>

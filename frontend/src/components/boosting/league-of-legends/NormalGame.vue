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
import { useRouter } from 'vue-router'

const router = useRouter()
const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

async function createOrder() {
  router.push({
    path: `/complete-payment/league-of-legends/normal-game`,
  })
}
</script>

<template lang="pug">
NormalGameCard
Checkout(checkoutTextColor="#000747" v-on:create-order="createOrder")
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

</style>

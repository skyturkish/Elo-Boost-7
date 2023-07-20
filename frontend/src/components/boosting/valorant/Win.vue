<script setup>
import CurrentRank from '@/components/boosting/valorant/CurrentRank'
import Checkout from '@/components/Checkout'
import SelectAmountWinGames from '@/components/boosting/valorant/SelectAmountWinGames'
import SelectServer from '@/components/boosting/valorant/SelectServer'
import SelectBooster from '@/components/boosting/valorant/SelectBooster'
import SelectAgents from '@/components/boosting/valorant/SelectAgents'
import Premium from '@/components/boosting/valorant/Premium'
import HighMmrAndSoloOnly from '@/components/boosting/valorant/HighMmrAndSoloOnly'
import UntrackableOrStream from '@/components/boosting/valorant/UntrackableOrStream'
import CustomSwitch from '@/components/CustomSwitch'
import { useValorantOrder } from '@/store/valorant-order'
import { useRouter } from 'vue-router'

const currentValorantOrder = useValorantOrder()
const router = useRouter()

async function createOrder() {
  router.push({
    path: `/complete-payment/valorant/win`,
  })
}
</script>

<template lang="pug">
CurrentRank(title="YOUR RANK" divisionLimit="8")
  SelectServer
  SelectAmountWinGames
Checkout(v-on:create-order="createOrder" checkoutTextColor='#280000' game='valorant' :order='currentValorantOrder.winOrder')
  template(v-slot:switchs)
    .custom-switch-two-options
      .choice SOLO
      CustomSwitch(v-model="currentValorantOrder.isDuo")
      .choice DUO
  template(v-slot:options)
    SelectBooster
    SelectAgents
    Premium
    HighMmrAndSoloOnly
    UntrackableOrStream
</template>

<style scoped>

</style>
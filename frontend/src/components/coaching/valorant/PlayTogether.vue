<script setup>
import CurrentRank from '@/components/coaching/valorant/CurrentRank.vue'
import Checkout from '@/components/Checkout.vue'
import SelectLanguages from '@/components/coaching/valorant/SelectLanguages.vue'
import SelectCoachAmountGame from '@/components/coaching/valorant/SelectCoachAmountGame.vue'
import SelectCoach from '@/components/coaching/valorant/SelectCoach'
import SelectAgents from '@/components/boosting/valorant/SelectAgents'
import Premium from '@/components/boosting/valorant/Premium'

import { useValorantOrder } from '@/store/valorant-order'

const currentValorantOrder = useValorantOrder()

async function createOrder() {
  await currentValorantOrder.playTogetherOrder()
}
</script>

<template lang="pug">
CurrentRank
  SelectLanguages
  SelectCoachAmountGame
Checkout(checkoutTextColor="#280000" game="valorant" v-on:create-order="createOrder")
  template(v-slot:options)
    SelectCoach
    SelectAgents
    Premium
</template>

<style scoped>

</style>

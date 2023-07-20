<script setup>
import CurrentRank from '@/components/coaching/valorant/CurrentRank.vue'
import Checkout from '@/components/Checkout.vue'
import SelectLanguages from '@/components/coaching/valorant/SelectLanguages.vue'
import SelectCoachAmountGame from '@/components/coaching/valorant/SelectCoachAmountGame.vue'
import SelectCoach from '@/components/coaching/valorant/SelectCoach'
import SelectAgents from '@/components/boosting/valorant/SelectAgents'
import Premium from '@/components/boosting/valorant/Premium'
import { useRouter } from 'vue-router'
import { useValorantOrder } from '@/store/valorant-order'

const currentValorantOrder = useValorantOrder()
const router = useRouter()

async function createOrder() {
  router.push({
    path: `/complete-payment/valorant/live-game`,
  })
}
</script>

<template lang="pug">
CurrentRank
  SelectLanguages
  SelectCoachAmountGame
Checkout(checkoutTextColor="#280000" game="valorant" v-on:create-order="createOrder" :order='currentValorantOrder.liveGameOrder')
  template(v-slot:options)
    SelectCoach
    SelectAgents
    Premium
</template>

<style scoped>

</style>

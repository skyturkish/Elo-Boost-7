<script setup>
import CurrentRank from '@/components/boosting/league-of-legends/CurrentRank'
import SelectLanguages from '@/components/coaching/league-of-legends/SelectLanguages'
import SelectHours from '@/components/coaching/league-of-legends/SelectHours'
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
    path: `/complete-payment/league-of-legends/lesson`,
  })
}

</script>

<template lang="pug">
CurrentRank(divisionLimit = 7 title = "YOUR RANK")
  div.selections-layout
    SelectHours
    SelectLanguages
Checkout(checkoutTextColor="#2B2D3D" v-on:create-order="createOrder" :order='currentLeagueOfLegendsOrder.lessonOrder')
  template(v-slot:options)
    SelectCoach
    SelectChampions
    Premium
</template>

<style scoped>
.selections-layout {
  display: flex;
}
</style>

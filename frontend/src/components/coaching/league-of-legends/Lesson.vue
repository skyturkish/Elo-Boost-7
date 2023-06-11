<script setup>
import CurrentRank from '@/components/boosting/league-of-legends/CurrentRank'
import SelectLanguages from '@/components/coaching/league-of-legends/SelectLanguages'
import SelectHours from '@/components/coaching/league-of-legends/SelectHours'
import Checkout from '@/components/Checkout'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

async function createOrder() {
  await currentLeagueOfLegendsOrder.createLessonOrder()
}
</script>

<template lang="pug">
CurrentRank(divisionLimit = 6 title = "YOUR RANK")
  SelectHours
  SelectLanguages
Checkout(v-on:create-order="createOrder")
</template>

<style scoped>
</style>

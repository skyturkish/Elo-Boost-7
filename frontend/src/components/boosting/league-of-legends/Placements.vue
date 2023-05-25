<script setup>
import CurrentMilestones from '@/components/boosting/league-of-legends/CurrentMilestones'
import SelectServer from '@/components/boosting/league-of-legends/SelectServer'
import SelectQueue from '@/components/boosting/league-of-legends/SelectQueue'
import SelectAmountGames from '@/components/boosting/league-of-legends/SelectAmountGames'
import Checkout from '@/components/Checkout'
import CurrentRank from '@/components/boosting/league-of-legends/CurrentRank'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'
import { ref } from 'vue'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

const hours = ref('10 GAMES')

const updateSelectedValue = (value) => {
  hours.value = value
}

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
      SelectAmountGames(:selected-value="hours" @update:selectedValue="updateSelectedValue")
  Checkout(v-on:create-order="createOrder")
</template>

<style scoped>
.placements {
  display: flex;
  justify-content: center;
  max-width: 1440px;
  margin: 0 auto;
  flex-wrap: wrap;
  background-color: #eeeeee;
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

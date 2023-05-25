<script setup>
import CurrentMilestones from '@/components/boosting/league-of-legends/CurrentMilestones'
import SelectServer from '@/components/boosting/league-of-legends/SelectServer'
import SelectQueue from '@/components/boosting/league-of-legends/SelectQueue'
import SelectAmountGames from '@/components/boosting/league-of-legends/SelectAmountGames'
import SelectGainLP from '@/components/boosting/league-of-legends/SelectGainLP'
import Checkout from '@/components/Checkout'
import CurrentRank from '@/components/boosting/league-of-legends/CurrentRank'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'
import { ref } from 'vue'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

const hours = ref('2 HOURS')

const updateSelectedValue = (value) => {
  hours.value = value
}

async function createOrder() {
  await currentLeagueOfLegendsOrder.createWinOrder(hours.value)
}

const items = ['1 HOURS','2 HOURS','3 HOURS', '4 HOURS', '5 HOURS', '6 HOURS']
</script>

<template lang="pug">
.win
  CurrentRank(divisionLimit = 9 title = "YOUR RANK" v-model="hours")
    CurrentMilestones
    .selections-layout
      SelectServer
      SelectQueue
      SelectAmountGames(:selected-value="hours" @update:selectedValue="updateSelectedValue")
      SelectGainLP
  Checkout(v-on:create-order="createOrder")
</template>

<style scoped>
.win {
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
}
.selections-layout > * {
  width: 50%;
}
</style>

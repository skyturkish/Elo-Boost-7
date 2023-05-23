<script setup>
import CurrentMilestones from '@/components/boosting/league-of-legends/CurrentMilestones'
import AmountGames from '@/components/boosting/league-of-legends/AmountGames'
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
</script>

<template lang="pug">
.win
  CurrentRank(divisionLimit = 9 title = "YOUR RANK" v-model="hours")
    CurrentMilestones
    AmountGames(title="AMOUNT" :selected-value="hours" @update:selectedValue="updateSelectedValue")
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
</style>

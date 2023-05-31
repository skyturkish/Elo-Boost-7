<script setup>
import { ref } from 'vue'
import axios from 'axios'
import CurrentRank from '@/components/boosting/league-of-legends/CurrentRank'
import Checkout from '@/components/Checkout'
import { useAccount } from '@/store/account'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

async function createOrder() {
  await currentLeagueOfLegendsOrder.createLessonOrder()
}
</script>

<template lang="pug">
.lesson
  CurrentRank(divisionLimit = 6 title = "YOUR RANK")
    v-select(v-model="currentLeagueOfLegendsOrder.coachingHours" :items="['1 HOURS', '2 HOURS', '3 HOURS', '4 HOURS', '5 HOURS']" )
    v-select(v-model="currentLeagueOfLegendsOrder.languages" :items="['ENGLISH', 'TURKISH', 'ARABIC']" chips multiple)
  Checkout(v-on:create-order="createOrder")
</template>

<style scoped>
.lesson {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
}
.v-select {
  width: 100%;
}
</style>

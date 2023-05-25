<script setup>
import { ref } from 'vue'
import axios from 'axios'
import CurrentRank from '@/components/boosting/league-of-legends/CurrentRank'
import Checkout from '@/components/Checkout'
import { useAccount } from '@/store/account'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const hours = ref('2 HOURS')

async function createOrder() {
  console.log('burası çalışıyor')
  await axios.post('/coaching', {
        customer: useAccount().user?._id || '643469684177539c6a6dcdb5',
        gameType: 'league-of-legends',
        orderType: 'division',
        coachingType: 'lesson',
        currentRank: useLeagueOfLegendsOrder().currentRank,
        lessonHour: hours.value
    })
}

</script>

<template lang="pug">
.lesson
  CurrentRank(title = "YOUR RANK")
    .hours-of-lesson HOURS OF LESSON
    v-select(:items="['1 HOURS', '2 HOURS', '3 HOURS', '4 HOURS', '5 HOURS']" v-model="hours")
  Checkout(v-on:create-order="createOrder")
</template>

<style scoped>
.lesson {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
}
.hours-of-lesson {
    font-family: Inter;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: normal;
    color: #444;
}
.v-select {
  width: 50%;
}
</style>

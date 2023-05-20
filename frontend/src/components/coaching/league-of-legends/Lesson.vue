<script setup>
import { ref } from 'vue'
import CurrentRank from '@/components/boosting/league-of-legends/CurrentRank'
import Checkout from '@/components/Checkout'

const hours = ref('2 HOURS')

</script>

<template lang="pug">
.lesson
  CurrentRank
    .hours-of-lesson HOURS OF LESSON
    v-select(:items="['1 HOURS', '2 HOURS', '3 HOURS', '4 HOURS', '5 HOURS']" v-model="hours")
  Checkout
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

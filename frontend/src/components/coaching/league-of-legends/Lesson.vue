<script setup>
import CurrentRank from '@/components/boosting/league-of-legends/CurrentRank'
import Checkout from '@/components/Checkout'

</script>

<template lang="pug">
.lesson
  CurrentRank()
  Checkout()
</template>

<style scoped>
.lesson {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
}
</style>

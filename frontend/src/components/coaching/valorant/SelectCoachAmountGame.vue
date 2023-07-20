<script setup>
import { useValorantOrder } from '@/store/valorant-order'

</script>

<template lang="pug">
v-select(v-model="useValorantOrder().amountCoachingGame" :items="['1 GAMES', '2 GAMES', '3 GAMES', '4 GAMES', '5 GAMES']" variant="outlined" bg-color="#F4F1F0")
</template>

<style scoped>

</style>

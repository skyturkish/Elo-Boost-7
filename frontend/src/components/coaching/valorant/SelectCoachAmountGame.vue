<script setup>
import { useValorantOrder } from '@/store/valorant'

</script>

<template lang="pug">
v-select(v-model="useValorantOrder().amountCoachingGame" :items="['1 GAMES', '2 GAMES', '3 GAMES', '4 GAMES', '5 GAMES']" outline variant="solo")
</template>

<style scoped>

</style>

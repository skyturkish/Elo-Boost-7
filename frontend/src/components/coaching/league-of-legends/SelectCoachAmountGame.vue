<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

</script>

<template lang="pug">
v-select(v-model="useLeagueOfLegendsOrder().amountCoachingGame" :items="['1 GAMES', '2 GAMES', '3 GAMES', '4 GAMES', '5 GAMES']" )
</template>

<style scoped>

</style>

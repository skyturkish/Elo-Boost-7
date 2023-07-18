<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()
</script>

<template lang="pug">
v-select(v-model="currentLeagueOfLegendsOrder.amountCoachingGame" :items="['1 GAMES', '2 GAMES', '3 GAMES', '4 GAMES', '5 GAMES']" variant="outlined")
  template(v-slot:selection='{ item, index }')
    h5(:style="{color: currentLeagueOfLegendsOrder.colors.dominantColor}") {{ item.title }}
</template>

<style scoped>

</style>

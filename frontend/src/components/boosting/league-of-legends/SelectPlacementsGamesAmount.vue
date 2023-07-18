<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()
</script>

<template lang="pug">
v-select(:items="['1 GAMES','2 GAMES','3 GAMES','4 GAMES','5 GAMES']" v-model="currentLeagueOfLegendsOrder.amountPlacementsGame" variant="outlined")
  template(v-slot:selection='{ item, index }')
    h5(:style="{color: currentLeagueOfLegendsOrder.colors.dominantColor}") {{ item.title }}
</template>

<style scoped>
</style>
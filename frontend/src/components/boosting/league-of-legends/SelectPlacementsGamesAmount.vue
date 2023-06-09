<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()
</script>

<template lang="pug">
v-select(:items="['2 GAMES','4 GAMES','6 GAMES','8 GAMES','10 GAMES']" v-model="currentLeagueOfLegendsOrder.amountPlacementsGame")
</template>

<style scoped>
</style>
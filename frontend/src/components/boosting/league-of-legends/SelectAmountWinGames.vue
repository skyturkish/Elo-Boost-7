<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()
</script>

<template lang="pug">
v-select(:items="['1 GAMES','2 GAMES','3 GAMES','4 GAMES','5 GAMES']" v-model="currentLeagueOfLegendsOrder.amountWinGame")
</template>

<style scoped>
</style>
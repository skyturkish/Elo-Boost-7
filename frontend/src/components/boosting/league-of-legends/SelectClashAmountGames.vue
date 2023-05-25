<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

</script>

<template lang="pug">
v-select(:items="['5 GAMES', '4 GAMES', '3 GAMES', '2 GAMES','1 GAMES']" v-model="useLeagueOfLegendsOrder().clashAmountGame" )
</template>

<style scoped>

</style>

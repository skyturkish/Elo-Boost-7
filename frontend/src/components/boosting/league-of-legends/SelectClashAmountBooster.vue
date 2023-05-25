<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

</script>

<template lang="pug">
v-select(:items="['5 BOOSTER', '4 BOOSTER', '3 BOOSTER', '2 BOOSTER','1 BOOSTER']" v-model="useLeagueOfLegendsOrder().clashAmountBooster" )
</template>

<style scoped>

</style>

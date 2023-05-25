<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

</script>

<template lang="pug">
v-select(:items="['TIER IV', 'TIER III', 'TIER II', 'TIER I']" v-model="useLeagueOfLegendsOrder().clashTier" )
</template>

<style scoped>

</style>

<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

</script>

<template lang="pug">
v-select(v-model="useLeagueOfLegendsOrder().coachingHours" :items="['1 HOURS', '2 HOURS', '3 HOURS', '4 HOURS', '5 HOURS']" )
</template>

<style scoped>

</style>

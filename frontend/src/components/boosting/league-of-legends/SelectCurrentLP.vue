<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()
</script>

<template lang="pug">
v-select(v-model="currentLeagueOfLegendsOrder.currentLP" :items="['0-20LP','20-40LP','40-60LP','60-80LP','80-100LP']")
</template>

<style scoped>
</style>
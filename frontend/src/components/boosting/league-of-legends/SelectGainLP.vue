<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()
</script>

<template lang="pug">
v-select(:items="['41+','40-36LP','35-30LP','30-26LP','25-21LP','20-14LP']" v-model="currentLeagueOfLegendsOrder.gainLP" variant="outlined")
</template>

<style scoped>
</style>
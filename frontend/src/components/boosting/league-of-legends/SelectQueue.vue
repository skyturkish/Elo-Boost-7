<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()
</script>

<template lang="pug">
v-select(:items="['solo','flex']" v-model="currentLeagueOfLegendsOrder.queue")
</template>

<style scoped>

</style>

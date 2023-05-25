<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()
</script>

<template lang="pug">
v-select(:items="['Turkey','China']" v-model="currentLeagueOfLegendsOrder.server")
</template>

<style scoped>

</style>

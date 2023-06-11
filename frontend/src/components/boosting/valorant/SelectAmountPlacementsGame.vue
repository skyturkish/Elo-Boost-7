<script setup>
import { useValorantOrder } from '@/store/valorant-order'

const currentValorantOrder = useValorantOrder()
</script>

<template lang="pug">
v-select(:items="['2 GAMES','4 GAMES','6 GAMES','8 GAMES','10 GAMES']" v-model="currentValorantOrder.amountPlacementsGame")
</template>

<style scoped>
</style>
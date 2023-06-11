<script setup>
import { useValorantOrder } from '@/store/valorant-order'

const currentValorantOrder = useValorantOrder()
</script>

<template lang="pug">
v-select(:items="['1 GAMES','2 GAMES','3 GAMES','4 GAMES','5 GAMES']" v-model="currentValorantOrder.amountUnratedMatchGame" outline variant="solo")
</template>

<style scoped>
</style>
<script setup>
import { useValorantOrder } from '@/store/valorant-order'

const currentValorantOrder = useValorantOrder()
</script>

<template lang="pug">
v-select(v-model="currentValorantOrder.currentRR" outline height="20" :items="['0-20RR', '20-40RR', '40-60RR','60-80RR','80-100RR']" variant="outlined" bg-color="#F4F1F0")
</template>

<style scoped>

</style>

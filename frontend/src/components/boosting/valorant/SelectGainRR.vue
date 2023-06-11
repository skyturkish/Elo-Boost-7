<script setup>
import { useValorantOrder } from '@/store/valorant-order'

const currentValorantOrder = useValorantOrder()
</script>

<template lang="pug">
v-select(v-model="currentValorantOrder.gainRR" outline height="20" :items="['5-10 GAIN', '10-15 GAIN', '15-20 GAIN','20-25 GAIN','+25 GAIN']" variant="solo")
</template>

<style scoped>

</style>

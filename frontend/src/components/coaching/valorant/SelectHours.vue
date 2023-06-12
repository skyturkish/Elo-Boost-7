<script setup>
import { useValorantOrder } from '@/store/valorant-order'

</script>

<template lang="pug">
v-select(v-model="useValorantOrder().coachingHours" :items="['1 HOURS', '2 HOURS', '3 HOURS', '4 HOURS', '5 HOURS']" outline variant="solo")
</template>

<style scoped>

</style>

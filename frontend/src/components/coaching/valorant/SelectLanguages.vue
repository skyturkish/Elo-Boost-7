<script setup>
import { useValorantOrder } from '@/store/valorant-order'

</script>

<template lang="pug">
v-select(v-model="useValorantOrder().languages" :items="['ENGLISH', 'TURKISH', 'ARABIC']" variant="solo")
</template>

<style scoped>

</style>

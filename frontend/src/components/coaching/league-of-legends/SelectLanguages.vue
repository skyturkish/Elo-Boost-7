<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

</script>

<template lang="pug">
v-select(v-model="useLeagueOfLegendsOrder().languages" :items="['ENGLISH', 'TURKISH', 'ARABIC']" chips multiple)
</template>

<style scoped>

</style>

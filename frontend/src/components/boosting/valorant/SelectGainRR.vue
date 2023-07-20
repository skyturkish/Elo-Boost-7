<script setup>
import { useValorantOrder } from '@/store/valorant-order'

const currentValorantOrder = useValorantOrder()
</script>

<template lang="pug">
v-select(v-model="currentValorantOrder.gainRR" outline height="20" :items="['41+','40-36RR','35-30RR','30-26RR','25-21RR','20-14RR']" variant="outlined" bg-color="#F4F1F0")
</template>

<style scoped>

</style>

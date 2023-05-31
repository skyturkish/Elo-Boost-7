<script setup>
import { useValorantOrder } from '@/store/valorant-order'
</script>

<template lang="pug">
v-select(v-model="useValorantOrder().server" outline height="20" :items="['EUROPE','TURKEY','CHINA']" variant="solo")
</template>

<style scoped>

</style>

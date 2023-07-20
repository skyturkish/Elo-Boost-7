<script setup>
import { useValorantOrder } from '@/store/valorant-order'
</script>

<template lang="pug">
v-select(v-model="useValorantOrder().server" outline height="20" :items="['Europe','NA']" variant="solo-filled" bg-color="#F4F1F0")
</template>

<style scoped>

</style>

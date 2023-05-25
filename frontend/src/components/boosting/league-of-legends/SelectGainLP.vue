<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()
</script>

<template lang="pug">
v-select(:items="['+25','25-20LP','20-15LP','15-10LP','10-']" v-model="currentLeagueOfLegendsOrder.gainLP")
</template>

<style scoped>
</style>
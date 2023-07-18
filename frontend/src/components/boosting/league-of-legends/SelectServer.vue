<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()
</script>

<template lang="pug">
v-select(:items="['EUW','EUNE','NA','RU','TR']" v-model="currentLeagueOfLegendsOrder.server" variant="outlined")
  template(v-slot:selection='{ item, index }')
    h5(:style="{color: currentLeagueOfLegendsOrder.colors.dominantColor}") {{ item.title }}
</template>

<style scoped>

</style>

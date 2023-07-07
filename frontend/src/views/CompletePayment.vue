<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'
import { useRoute } from 'vue-router';
import { computed } from 'vue'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()
const route = useRoute()
const game = route.params.game
const type = route.params.type

const order = computed(() => {
  switch(type) {
    case 'division':
      return currentLeagueOfLegendsOrder.divisionOrder
    case 'win':
      return currentLeagueOfLegendsOrder.winOrder
    case 'placements':
      return currentLeagueOfLegendsOrder.placementsOrder
    case 'normal-game':
     return currentLeagueOfLegendsOrder.normalGameOrder
     case 'lesson':
      return currentLeagueOfLegendsOrder.lessonOrder
    case 'game-replay':
      return currentLeagueOfLegendsOrder.gameReplayOrder
    case 'live-game':
     return currentLeagueOfLegendsOrder.liveGameOrder
    case 'play-together':
     return currentLeagueOfLegendsOrder.playTogetherOrder
    }
})

</script>

<template lang="pug">
Banner(splashArtPath = 'gwen' title= 'COMPLETE PAYMENT' subtitle= 'Select your payment options below')
h1 {{ game }} {{  order }}
</template>

<style scoped>

</style>

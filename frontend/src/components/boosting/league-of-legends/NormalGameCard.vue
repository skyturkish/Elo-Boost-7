<script setup>
import { ref } from 'vue'
import SelectServer from '@/components/boosting/league-of-legends/SelectServer'
import SelectQueue from '@/components/boosting/league-of-legends/SelectQueue'
import SelectNormalAmountGames from '@/components/boosting/league-of-legends/SelectNormalAmountGames'

import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'
const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

const maps = currentLeagueOfLegendsOrder.maps
</script>

<template lang="pug">
.selamlar
  .crown-background
    img.crown(:src="'https://storage.googleapis.com/divine-boost-bucket/assets/assets/crowns/' + currentLeagueOfLegendsOrder.selectedMap.name + '.webp'" v-bind:style="{width: currentLeagueOfLegendsOrder.selectedMap.width}")
  .normal-game-card(:style="`border: solid 2px ${currentLeagueOfLegendsOrder.selectedMap.borderColor}`")
    .change-logo-and-logo
      v-icon.left-(icon="mdi-menu-left" @click="currentLeagueOfLegendsOrder.changeMapWithIcon" :color="currentLeagueOfLegendsOrder.selectedMap.dominantColor")
      img.logo(:src="'https://storage.googleapis.com/divine-boost-bucket/assets/assets/crowns/' + currentLeagueOfLegendsOrder.selectedMap.name + '-logo.webp'")
      v-icon.right-(icon="mdi-menu-right" @click="currentLeagueOfLegendsOrder.changeMapWithIcon" :color="currentLeagueOfLegendsOrder.selectedMap.dominantColor")
    .game-name(:style="{color: currentLeagueOfLegendsOrder.selectedMap.dominantColor, backgroundColor: currentLeagueOfLegendsOrder.selectedMap.shadowColor}") {{ currentLeagueOfLegendsOrder.selectedMap.name }}
    .colors
      v-btn.color(
        v-for="map in maps"
        :flat="map.name == currentLeagueOfLegendsOrder.selectedMap.name ? false : true"
        icon
        :size="map.name == currentLeagueOfLegendsOrder.selectedMap.name ? '2rem' : '1.5rem'"
        :color="map.buttonColor"
        @click="currentLeagueOfLegendsOrder.changeMap(map)")
    .selections
      SelectServer
      SelectQueue
      SelectNormalAmountGames
</template>

<style scoped>
.crown-background {
  width: 25rem;
  display:flex;
  justify-content: center;
  align-items: center;
}
.crown{
  height: 7rem;
  margin-bottom: -4rem;
}
.normal-game-card {
  width: 22.5rem;
  border-radius: 15px;
  margin: 0 auto;
  background-color: #fff;
  height: 42rem;
}
.change-logo-and-logo {
  display: flex;
  align-items: center;
  padding-top: 3rem;
  padding-left: 1.8rem;
}
.left- {
  margin-right: -2.5rem;

}
.logo {
  height: 15.625rem;
  width: 15.625rem;
  margin: 0 auto;
}
.right- {
  margin-left: -2.5rem;
}
.game-name {
  font-weight: bold;
  margin-top: 23px;
  text-align:center;
  font-size: 2rem;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  text-transform: uppercase;

}
.colors {
  display: flex;
  margin-top: 2.5rem;
  margin-bottom: 2rem;
  justify-content: center;
  align-items: center;
  gap: 0.90rem;
}
.selections {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.selections > * {
  width: 50%;
}
</style>
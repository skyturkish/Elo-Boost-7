<script setup>
import { ref } from 'vue'
import SelectServer from '@/components/boosting/league-of-legends/SelectServer'
import SelectQueue from '@/components/boosting/league-of-legends/SelectQueue'
import SelectNormalAmountGames from '@/components/boosting/league-of-legends/SelectNormalAmountGames'

import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'
const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

const maps = currentLeagueOfLegendsOrder.maps

const crownUrls = import.meta.glob('../../../assets/crowns/*.png', {
  import: 'default',
  eager: true
})
</script>

<template lang="pug">
.a
  .crown-background
    v-img.crown(:src="crownUrls['../../../assets/crowns/' + currentLeagueOfLegendsOrder.selectedMap.name + '.png']" :width="currentLeagueOfLegendsOrder.selectedMap.width")
  .normal-game-card(:style="`border: solid 2px ${currentLeagueOfLegendsOrder.selectedMap.borderColor}`")
    .change-logo-and-logo
      v-icon.left-(icon="mdi-menu-left" @click="currentLeagueOfLegendsOrder.changeMapWithIcon" :color="currentLeagueOfLegendsOrder.selectedMap.dominantColor")
      v-img.logo(:src="crownUrls['../../../assets/crowns/' + currentLeagueOfLegendsOrder.selectedMap.name + '-logo.png']" width="11.625rem")
      v-icon.right-(icon="mdi-menu-right" @click="currentLeagueOfLegendsOrder.changeMapWithIcon" :color="currentLeagueOfLegendsOrder.selectedMap.dominantColor")
    .game-name(:style="{color: currentLeagueOfLegendsOrder.selectedMap.dominantColor, backgroundColor: currentLeagueOfLegendsOrder.selectedMap.shadowColor}") {{ currentLeagueOfLegendsOrder.selectedMap.name.toUpperCase() }}
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
.crown{
  margin: 0 auto;
  margin-bottom: -4rem;
  height: 7rem;
}
.crown-background {
  width: 26rem;
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
<script setup>
import Banner from "@/components/Banner.vue";
import CoachingGamesMenu from "@/components/menus/CoachingGamesMenu.vue";

const coachingTypes = [
  {
    name: 'LESSON',
    route: 'lesson',
  },
  {
    name: 'LIVE GAME',
    route: 'live-game',
  },
  {
    name: 'PLAY TOGETHER',
    route: 'play-together',
  }
]
</script>

<template lang="pug">
Banner(splashArtPath = 'valorant-coaching' title = 'VALORANT' subtitle = 'FPS gods are here to help')
  CoachingGamesMenu(gameName='VALORANT' gameImagePath='valorant')
v-divider.border-opacity-100(thickness="1rem" )
.coachType
  .buttons
    v-btn(v-for="coachType in coachingTypes" size="x-large" :to='`${coachType.route}`' ) {{ coachType.name }}
  router-view()
</template>

<style scoped>
.v-divider {
  border-color:  #0a0b0f !important;
}
.buttons {
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  justify-content: space-around;
  padding: 2rem 0;
  background-color: #f1f1f1;
  flex-wrap: wrap;
}
.v-btn {
  width: 200px;
  height: 70px;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}
</style>

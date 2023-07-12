<script setup>
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
    v-btn.coach-type-button(v-for="coachType in coachingTypes" size="x-large" :to='`${coachType.route}`' ) {{ coachType.name }}
  .dynamic-view
    router-view()
</template>

<style scoped>
.v-divider {
  border-color:  #0a0b0f !important;
}
.coachType {
  background-color: #1c1920;
}
.buttons {

  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  gap: 1.375rem;
  padding: 2rem 2.75rem;
  flex-wrap: wrap;
  justify-content: center;
}
.coach-type-button {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: normal;
  color: #eee;
  background-color: #444;
}
.v-btn--active {
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #7000ff;
  color: #fff;
}
.v-btn:hover {
  margin-top: -0.5rem;
}
.v-btn {
  width: 200px;
  height: 70px;
  border-radius: 15px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}
.dynamic-view {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 2.75rem;
  gap: 2.5rem;
  min-height: 900px;
}
</style>

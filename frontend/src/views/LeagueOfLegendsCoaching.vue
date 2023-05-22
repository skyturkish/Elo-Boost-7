<script setup>
import Banner from "@/components/Banner.vue";
import CoachingGamesMenu from "@/components/menus/CoachingGamesMenu.vue";

const coachingTypes = [
  {
    name: 'LESSON',
    route: 'lesson',
  },
  {
    name: 'GAME REPLAY',
    route: 'game-replay',
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
Banner(splashArtPath = 'league-of-legends-coaching' title = 'LEAGUE OF LEGENDS' subtitle = 'Coaching lessons from greatest teachers')
  CoachingGamesMenu(gameName='LEAGUE OF LEGENDS' gameImagePath='league-of-legends')
v-divider.border-opacity-100(thickness="1rem" )
.coachType
  .buttons
    v-btn.coach-type-button(v-for="coachType in coachingTypes" size="x-large" :to='`${coachType.route}`' ) {{ coachType.name }}
  .c
    router-view()
</template>

<style scoped>
.v-divider {
  border-color: #1c1645 !important;
}
.coachType {
  max-width: 1440px;
  background-color: #f1f1f1;
  margin: 0 auto;
}
.buttons {
  display: flex;
  gap: 1.375rem;
  padding: 2rem 0;
  margin: 0 auto;
  max-width: 926px;
  background-color: #f1f1f1;
  flex-wrap: wrap;
  justify-content: center;
}
.coach-type-button {
  font-family: Inter;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: normal;
  color: #bbb;
}
.v-btn--active {
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  border: solid 1px #6262ED;
  color: #280051;
}
.v-btn:hover {
  border: solid 1px #6262ED;
  color: #280051;
}
.v-btn {
  width: 200px;
  height: 70px;
  border-radius: 15px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}
.c {
  max-width: 926px;
  margin: 0 auto;
}
</style>

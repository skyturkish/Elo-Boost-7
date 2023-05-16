<script setup>
import Banner from '@/components/Banner'
import GamesMenu from '@/components/menus/GamesMenu'


const boostTypes = [
  {
    name: 'DIVISION BOOST',
    route: 'divisions',
  },
  {
    name: 'WIN BOOST',
    route: 'winn',
  },
  {
    name: 'PLACEMENTS',
    route: 'placement',
  },
  {
    name: 'NORMAL GAME',
    route: 'normal-game',
  },
  {
    name: 'CLASH',
    route: 'clash',
  },
  {
    name: 'MASTERY',
    route: 'mastery',
  },
]
</script>

<template lang="pug">
Banner(splashArtPath = 'league-of-legends' title= 'LEAGUE OF LEGENDS' subtitle= 'No time? Don’t worry, Let our team climb for you' backgroundColor='#212027')
  GamesMenu(gameName='LEAGUE OF LEGENDS' gameImagePath='league-of-legends')
v-divider.border-opacity-100(thickness="1rem" )
.boostType
  .buttons
    v-btn(v-for="boostType in boostTypes" size="x-large" :to='`${boostType.route}`' ) {{ boostType.name }}
  router-view()
</template>

<style scoped>

.v-btn--active {
  color: #8A80AD;
}
.buttons {
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  justify-content: space-around;
  padding-top: 1rem;
  background-color: #f1f1f1;
}
.v-btn {
  width: 200px;
  height: 70px;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.v-divider {
  border-color: #475a7e !important;
}
/* .boostType {
  background-color: #341017;
}  */
</style>
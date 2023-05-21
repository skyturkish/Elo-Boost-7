<script setup>
import Banner from '@/components/Banner'
import GamesMenu from '@/components/menus/GamesMenu'

const boostTypes = [
  {
    name: 'DIVISION BOOST',
    route: 'division',
  },
  {
    name: 'WIN BOOST',
    route: 'win',
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
Banner(splashArtPath = 'league-of-legends' title= 'LEAGUE OF LEGENDS' subtitle= 'No time? Don’t worry. Let our team climb for you' backgroundColor='#212027')
  GamesMenu(gameName='LEAGUE OF LEGENDS' gameImagePath='league-of-legends')
v-divider.border-opacity-100(thickness="1rem" )
.boostType
  .buttons
    v-btn(v-for="boostType in boostTypes" size="x-large" :to='`${boostType.route}`' ) {{ boostType.name }}
  .dynamic-view
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
  gap: 1.375rem;
  padding: 2rem 2.75rem;
  background-color: #eeeeee;
  flex-wrap: wrap;

}
.dynamic-view {
  max-width: 1440px;
  margin: 0 auto;
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
.boostType {
  background-color: #eeeeee;
;
}
/* .boostType {
  background-color: #341017;
} */
</style>
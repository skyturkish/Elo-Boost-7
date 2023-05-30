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
    route: 'placements',
  },
  {
    name: 'UNRATED MATCH',
    route: 'unrated-match',
  },
  {
    name: 'PREMIER',
    route: 'premier',
  },
  {
    name: 'CONTRACTS',
    route: 'contracts',
  },
]
</script>

<template lang="pug">
Banner(splashArtPath = 'valorant' title= 'VALORANT' subtitle= 'Time to RISE UP!')
  GamesMenu(gameName='VALORANT' gameImagePath='valorant')
v-divider.border-opacity-100(thickness="1rem")
.boostType
  .buttons
    v-btn(v-for="boostType in boostTypes" size="x-large" :to='`${boostType.route}`' ) {{ boostType.name }}
  router-view()
</template>

<style scoped>
.boostType {
  background-color: #341017;
}
.buttons {
  padding: 2rem 2.75rem;
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  gap: 1.375rem;
  background-color: #341017;
  flex-wrap: wrap;
}
.v-btn {
  width: 200px;
  height: 70px;
  border-radius: 15px;
  background-color: #444;
}
.v-divider {
  border-color: #f83e4b !important;
}

</style>
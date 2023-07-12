<script setup>

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
    v-btn.boost-type-button(v-for="boostType in boostTypes" size="x-large" :to='`${boostType.route}`' ) {{ boostType.name }}
  .dynamic-view
    router-view
</template>

<style scoped>
.v-divider {
  border-color: #f83e4b ;
}
.boostType {
  background-color: #341017;

}
.buttons {
  display: flex;
  justify-content: center;
  max-width: 1440px;
  margin: 0 auto;
  gap: 1.375rem;
  padding: 2rem 2.75rem 2rem 4rem;
  flex-wrap: wrap;
}
.v-btn {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: normal;
  width: 200px;
  height: 70px;
  border-radius: 15px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  color: #DDDDDD;
  background-color: #444444;
}
.v-btn--active {
  background-color: #D42D2D;
  color: #FFFFFF;
}
.v-btn:hover {
  margin-top: -0.5rem;
}
.dynamic-view {
  max-width: 1440px;
  min-height: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 2rem;
  gap: 2.5rem;
}

</style>
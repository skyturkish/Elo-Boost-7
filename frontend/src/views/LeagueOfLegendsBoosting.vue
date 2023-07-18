<script setup>
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
  // {
  //   name: 'NORMAL GAME',
  //   route: 'normal-game',
  // },
  // {
  //   name: 'ARENA',
  //   route: 'arena',
  // },
  // {
  //   name: 'CLASH',
  //   route: 'clash',
  // },
]
</script>

<template lang="pug">
Banner(splashArtPath = 'league-of-legends' title= 'LEAGUE OF LEGENDS' subtitle= 'No time? Don’t worry. Let our team climb for you')
  GamesMenu(gameName='LEAGUE OF LEGENDS' gameImagePath='league-of-legends')
v-divider.border-opacity-100(thickness="1rem")
.boostType
  .buttons
    v-btn.boost-type-button(v-for="boostType in boostTypes" size="x-large" :to='`${boostType.route}`') {{ boostType.name }}
    img.close-button(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/normal-game-button.webp")
    img.close-button(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/arena-button.webp")
    img.close-button(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/clash-button.webp")
  .dynamic-view
    router-view()
</template>

<style scoped>
.v-divider {
  border-color: #656EC0 !important;
}
.boostType {
  background-color: #FBFBFB;
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
.boost-type-button {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: normal;
  color: #BBBBBB;
}
.close-button {
  width: 200px;
  height: 79px;
}

.v-btn--active {
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #3C54FF;
  color: #FFFFFF;
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
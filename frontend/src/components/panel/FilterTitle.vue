<script setup>
import { useOrders } from '@/store/orders'
import { computed } from 'vue'
const useOrdersStore = useOrders()

const games = ['league-of-legends', 'valorant']

const otherGames = computed(() => {
  return games.filter((game) => game !== useOrdersStore.filteredGame)
})

function changeFilteredGame(game) {
  useOrdersStore.filteredGame = game
  console.log(  useOrdersStore.filteredGame)
}

</script>

<template lang="pug">
.first-place
  .first-row
    v-menu
      template(v-slot:activator='{ props }')
        img.game-icon(:src='`../../src/assets/icons/${useOrdersStore.filteredGame}.png`' v-bind='props')
      v-list
        img.game-icon(v-for='game in otherGames' :key='game.name' :src='`../../src/assets/icons/${game}.png`' @click="changeFilteredGame(game)")
    .offer-title AVAILBABLE OFFERS
  v-icon.settings-icon(icon='mdi-cog' size="33px")
</template>

<style scoped>
.first-place {
  margin: 0 auto;
  height: 100px;
  border-radius: 7px;
  border: solid 1px #eee;
  background-color: #fff;
  display:flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 33px 15px 12px;
}
.first-row {
  display: flex;
  width: 580px;
  align-items: center;
  justify-content: space-between;
}
.game-icon {
  width: 4.6875rem;
  height: 4.6875rem;
  border-radius: 9px;
  border: solid 1px #eee;
}
.offer-title {
  font-size: 32px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #222;
}
</style>

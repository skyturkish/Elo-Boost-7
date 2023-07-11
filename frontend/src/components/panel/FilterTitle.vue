<script setup>
import { useOrders } from '@/store/orders'
import { computed } from 'vue'
const props = defineProps({
  title: {
    type: String,
    required: true
  },
})


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
        img.game-icon(:src='`https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/${useOrdersStore.filteredGame}.webp`' v-bind='props')
      v-list
        img.game-icon(v-for='game in otherGames' :key='game.name' :src='`https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/${game}.webp`' @click="changeFilteredGame(game)")
    h1.offer-title {{ title }}
  v-icon.settings-icon(icon='mdi-cog' size="33px")
</template>

<style scoped>
.first-place {
  border-radius: 7px;
  border: solid 1px #eee;
  display:flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
}
.first-row {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.game-icon {
  width: 4.6875rem;
}
.offer-title {
  font-size: 32px;
  font-weight: 600;
  color: #222;
}
</style>

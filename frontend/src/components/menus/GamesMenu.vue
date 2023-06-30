<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  gameName: {
    type: String,
    required: true
  },
  gameImagePath: {
    type: String,
    required: true
  }
})

const games = [
  {
    url: '/boosting/league-of-legends/division',
    name: 'LEAGUE OF LEGENDS',
    imagePath: 'league-of-legends',
  },
  {
    url: '/boosting/valorant/division',
    name: 'VALORANT',
    imagePath: 'valorant',
  },
  {
    url: '/boosting/apex-legends',
    name: 'APEX LEGENDS',
    imagePath: 'apex-legends',
  },
  {
    url: '/boosting/overwatch',
    name: 'OVERWATCH',
    imagePath: 'overwatch',
  },
  {
    url: '/boosting/wild-rift',
    name: 'WILD RIFT',
    imagePath: 'wild-rift',
  },
]

function replacePage(game){
  router.push({path: game.url})
}
</script>

<template lang="pug">
v-menu(max-width='100px')
  template(v-slot:activator='{ props }')
    div.select-games(@click='' v-bind='props')
      img.game-image(:src='`/src/assets/icons/${gameImagePath}.png`')
      .a ●
      .game-name {{ gameName }}
      v-icon(icon="mdi-menu-down")
  v-list
    v-list-item(v-for='game in games' :key='game.name' @click='replacePage(game)')
      template(v-slot:prepend='')
        img.aa(:src='`/src/assets/icons/${game.imagePath}.png`')
      v-list-item-title(v-text='game.name')
</template>

<style scoped>
.aa {
  width: 30px;
}

.circle {
  width: 5px;
}

.select-games {
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  width: 334px;
  height: 70.1px;
  border-radius: 15px;
  background-color: #fff;
}
.game-image {
  width: 3rem;
}
.game-name {
  font-family: Inter;
  font-size: 20px;
  font-weight: 800;
}
.row {
  display: flex;
}
</style>
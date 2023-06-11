<script setup>
import { ref } from 'vue'
import CurrentRank from '@/components/boosting/valorant/CurrentRank'
import Checkout from '@/components/Checkout'

import SelectServer from '@/components/boosting/valorant/SelectServer'
import SelectAmountUnratedMatchGames from '@/components/boosting/valorant/SelectAmountUnratedMatchGames'

import SelectBooster from '@/components/boosting/valorant/SelectBooster'
import SelectAgents from '@/components/boosting/valorant/SelectAgents'
import Premium from '@/components/boosting/valorant/Premium'
import HighMmrAndSoloOnly from '@/components/boosting/valorant/HighMmrAndSoloOnly'
import UntrackableOrStream from '@/components/boosting/valorant/UntrackableOrStream'

import CustomSwitch from '@/components/CustomSwitch'

import { useValorantOrder } from '@/store/valorant-order'

const currentValorantOrder = useValorantOrder()

const gameTypes = ['unrated','swift','spike-rush','deathmatch','escalation']

const selectedGameType = ref('unrated')

async function createOrder() {
  await currentValorantOrder.createUnratedMatch()
}
</script>

<template lang="pug">
.unrated-match-card
  v-img(src='@/assets/valorant-player-card.png' width="23rem")
    .content
      .title GAME TYPE
      v-img.selected-game-type(:src='`../../../src/assets/valorant-game-Types/${selectedGameType}.png`' width="12rem")
      .selected-game-name {{ selectedGameType.toUpperCase() }}
      .selections
        SelectServer
        SelectAmountUnratedMatchGames
      .game-types
        .game-type(v-for="gameType in gameTypes" v-bind:class="selectedGameType == gameType ? 'selected-game' : 'unselected-game' " @click="selectedGameType = gameType")
          v-img(:src='`../../../src/assets/valorant-game-Types/${gameType}.png`' width="12rem")
Checkout(v-on:create-order="createOrder" checkoutTextColor='#280000' game='valorant')
  template(v-slot:switchs)
    .custom-switch-two-options
      .choice SOLO
      CustomSwitch(v-model="currentValorantOrder.isSolo")
      .choice DUO
  template(v-slot:options)
    SelectBooster
    SelectAgents
    Premium
    HighMmrAndSoloOnly
    UntrackableOrStream
</template>

<style scoped>
.unrated-match-card {
  margin: 0 auto
}
.content {
  padding-top: 3.6rem;
  display:flex;
  flex-direction: column;
  align-items: center;
}
.title {
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
  font-size: 32px;
  font-weight: 600;
  color: #fff;
  padding-top: 0.75rem;
  padding-bottom: 3.5rem;
}
.selected-game-type {
  width: 5.3125rem;
  height: 5.3125rem;
}
.selected-game-name {
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
  font-size: 32px;
  font-weight: 600;
  color: #fff;
  padding-top: 3.5rem;
}
.selections {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding-top: 3rem;
}
.game-types {
  display: flex;
  padding-top: 6.5rem;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}
.unselected-game {
  width: 39px;
  height: 40px;
  cursor: pointer
}
.selected-game {
  width: 50px;
  height: 50px;
  cursor: pointer
}
</style>
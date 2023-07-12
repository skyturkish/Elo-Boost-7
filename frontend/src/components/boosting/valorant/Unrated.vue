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
import { useRouter } from 'vue-router'

const gameTypes = ['unrated','swift','spike-rush','deathmatch','escalation']
const currentValorantOrder = useValorantOrder()
const router = useRouter()

async function createOrder() {
  router.push({
    path: `/complete-payment/valorant/unrated`,
  })
}
</script>

<template lang="pug">
.unrated-match-card
  img.player-card(src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/valorant-player-card.webp' alt='player-card')
  div
    .content
      .title GAME TYPE
      img.selected-game-type(:src='`https://storage.googleapis.com/divine-boost-bucket/assets/assets/valorant-game-Types/${currentValorantOrder.selectedGameType}.webp`' alt='selected-game-type')
      .selected-game-name {{ currentValorantOrder.selectedGameType}}
      .selections
        SelectServer
        SelectAmountUnratedMatchGames
      .game-types
        img.game-type(v-for="gameType in gameTypes" v-bind:class="currentValorantOrder.selectedGameType == gameType ? 'selected-game' : 'unselected-game' " @click="currentValorantOrder.selectedGameType = gameType" :src='`../../../src/assets/valorant-game-Types/${gameType}.webp`' alt='game-type')
Checkout(v-on:create-order="createOrder" checkoutTextColor='#280000' game='valorant')
  template(v-slot:switchs)
    .custom-switch-two-options
      .choice SOLO
      CustomSwitch(v-model="currentValorantOrder.isDuo")
      .choice DUO
  template(v-slot:options)
    SelectBooster
    SelectAgents
    Premium
    HighMmrAndSoloOnly
    UntrackableOrStream
</template>

<style scoped>
.player-card {
  width: 23rem;
  margin-bottom: -49.5rem;
}
.unrated-match-card {
  margin: 0 auto
}
.content {
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
  text-transform: uppercase;
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
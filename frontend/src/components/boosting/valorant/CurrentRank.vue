<script setup>
import { ref } from 'vue'

import { valorantDivisions, valorantMilestones } from '@/constants/valorant-constants'
import { useValorantOrder } from '@/store/valorant-order'


const divisions = valorantDivisions
const milestones = valorantMilestones

const currentValorantOrder = useValorantOrder()

function changeCurrentDivision(division) {
  currentValorantOrder.currentRank.division = division
}

function changeCurrentDivisionMileStone(milestone) {
  currentValorantOrder.currentRank.milestone = milestone
}

const imgUrls = import.meta.glob('../../../assets/ranks/valorant/*.png', {
  import: 'default',
  eager: true
})

function adana(se) {
  if (se == 'I') return 1;
  if (se == 'II') return 2;
  if (se == 'III') return 3;
}

</script>

<template lang="pug">
.current-rank
  v-img(src='@/assets/valorant-player-card.png' width="28rem")
    .content
      .title CURRENT RANK
      v-img.act-rank(src='@/assets/act-rank-level1.png'  width="10rem")
        v-img.rank-icon(:src='imgUrls[`../../../assets/ranks/valorant/${currentValorantOrder.currentRank.division}-${adana(currentValorantOrder.currentRank.milestone)}.png`]' width="3.5rem")
      .title {{ currentValorantOrder.currentRank.division }} {{ currentValorantOrder.currentRank.milestone }}
      .colors
        v-btn.color(
          v-for="division in divisions"
          :flat="division.name == currentValorantOrder.currentRank.division ? false : true"
          icon
          :size="division.name == currentValorantOrder.currentRank.division ? '2rem' : '1.5rem'"
          :color="division.color"
          @click="changeCurrentDivision(division.name)")
      .selections
        v-select(
          v-model="currentValorantOrder.currentRank.currentRR" outline height="20" :items="['100-80', '80-60', '60-40','40-20','20-0']" variant="solo")
        .buttons
          div.button(v-for="milestone in milestones" @click="changeCurrentDivisionMileStone(milestone)") {{ milestone }}
</template>

<style scoped>
.desired-rank,
.checkout,
.current-rank {
  margin: 0 auto
}
.content {
  padding-top: 5rem;
  display:flex;
  flex-direction: column;
  align-items: center;
}
.title {
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
  font-size: 32px;
  font-weight: 600;
  color: #fff;
}
.buttons {
  display: flex;
  gap: 0.5rem;
}
.button {
  width: 2rem;
  height: 2rem;
  border-radius: 5px;
  background-color: #f4f1f0;
  display: flex;
  justify-content: center;
}
.act-rank {
  display: flex;
  align-items: center;
}
.rank-icon {
  margin: 0 auto;
  margin-top: 1.5rem;
}
.colors {
  padding-top: 13rem;
}
.color {
  margin-left: 0.5rem;
}
.selections {
  display: flex;
  gap: 1rem;
  align-items: center
}
.v-select.v-input--horizontal{
  grid-template-areas: 'reset';
}
.v-select > .v-input__control > .v-field{
  font-size: 8px;
}
</style>

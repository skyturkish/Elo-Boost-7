<script setup>
import CurrentRank from '@/components/boosting/valorant/CurrentRank'
import Checkout from '@/components/Checkout'
import CheckoutSelection from '@/components/CheckoutSelection'
import { valorantDivisions, valorantMilestones  } from '@/constants/valorant-constants'
import { useValorantOrder } from '@/store/valorant-order'
import { ref } from 'vue'
import { useAccount } from '@/store/account'

const currentValorantOrder = useValorantOrder()

const divisions = valorantDivisions
const milestones = valorantMilestones
const desiredDivision = ref(divisions[3])
const desiredMilestone = ref('II')

function changeDesiredDivision(division) {
  desiredDivision.value = division
}

function changeDesiredDivisionMileStone(milestone) {
  desiredMilestone.value = milestone
}

function isDesiredDivision(division) {
  return desiredDivision.value.name == division.name
}

function isSelectedMilestone(milestone) {
  return desiredMilestone.value == milestone
}

const imgUrls = import.meta.glob('../../../assets/ranks/valorant/*.png', {
  import: 'default',
  eager: true
})

const rankBackgrounds = import.meta.glob('../../../assets/rank-background/*.png', {
  import: 'default',
  eager: true
})

async function createOrder() {
  await currentValorantOrder.createDivisionOrder({
    division: desiredDivision.value,
    milestone: desiredMilestone.value
  })
}
</script>

<template lang="pug">
.division-boost
  CurrentRank()
  .desired-rank
    v-img(src='@/assets/valorant-player-card.png' width="23rem")
      .content
        .title DESIRED RANK
        v-img.act-rank(src='@/assets/act-rank-level3.png' width="12rem")
          v-img.rank-background(:src='rankBackgrounds[`../../../assets/rank-background/${desiredDivision.name}.png`]' width="9rem")
            v-img.rank-icon(:src='imgUrls[`../../../assets/ranks/valorant/${desiredDivision.name}-${desiredMilestone}.png`]' width="4.2rem")
        .title {{ desiredDivision.name.toUpperCase() }} {{ desiredMilestone }}
        .colors
          v-btn.color(
            v-for="division in divisions"
            :flat="isDesiredDivision(division) ? false : true"
            icon
            :size="isDesiredDivision(division) ? '2rem' : '1.5rem'"
            :color="division.color"
            @click="changeDesiredDivision(division)")
        .selections
          v-select(v-model="currentValorantOrder.server" outline height="20" :items="['EUROPE','TURKEY','CHINA']" variant="solo")
          .milestones
            .milestone(
              v-for="milestone in milestones"
              :style="{backgroundColor: isSelectedMilestone(milestone) ? '#f4f1f0' : '#afafaf'}"
              @click="changeDesiredDivisionMileStone(milestone)"
              ) {{ milestone }}
  Checkout(v-on:create-order="createOrder")
    CheckoutSelection(toolTipText="BOOSTER SEÇEBİLİRSİN" title="BOOSTER")
      v-img(src='@/assets/icons/plus.png' width="50px")
    CheckoutSelection(toolTipText="AGENTLARI SEÇEBİLİRİSİNZ" title="AGENTS")
      v-btn(icon="mdi-plus-circle")
    CheckoutSelection(toolTipText="Bonus win istiyorsan buna tıkla" title="BONUS WIN")
      .display-flex
        v-img(src='@/assets/icons/high-mmr.png' width="50px")
        v-switch(v-model='currentValorantOrder.bonusWin.isActivate' color='blue')
    CheckoutSelection(toolTipText="premium istiyorsan tamı tamına şu yanımdaki şeye basabilirisin" title="PREMİUM")
      .display-flex
        v-img(src='@/assets/icons/premium.png' width="50px")
        v-switch(v-model='currentValorantOrder.premium.isActivate' color='blue')
</template>

<style scoped>
.division-boost {
  font-family: Inter;
  margin: 0 auto;
  max-width: 1440px;
  display:flex;
  flex-wrap: wrap;
  background-color: #341017;
}
.desired-rank {
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
}
.act-rank {
  display: flex;
  align-items: center;
}
.rank-background {
  margin: 0 auto
}
.rank-icon {
  margin: 0 auto;
  margin-top: 31%;
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
  align-items: center;
  padding-top: 1.5rem;
}
.milestones {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}
.milestone {
  font-family: Inter;
  width: 1.9375rem;
  height: 1.9375rem;
  border-radius: 6px;
  background-color: #afafaf;
  font-size: 15px;
  font-weight: 800;
  color: #444;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
/* .v-select.v-input--horizontal{
  grid-template-areas: 'reset';
}
.v-select > .v-input__control > .v-field{
  font-size: 8px;
}
.v-switch.v-input {
  flex: 0 auto
}
.v-switch.v-input--horizontal {
  grid-template-areas: 'reset'
} */
</style>
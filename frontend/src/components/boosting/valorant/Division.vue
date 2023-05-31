<script setup>
import CurrentRank from '@/components/boosting/valorant/CurrentRank'
import Checkout from '@/components/Checkout'
import CheckoutSelection from '@/components/CheckoutSelection'
import { valorantDivisions, valorantMilestones  } from '@/constants/valorant-constants'
import { useValorantOrder } from '@/store/valorant-order'
import { ref, computed } from 'vue'
import { useAccount } from '@/store/account'


const divisions = valorantDivisions
const milestones = valorantMilestones
const currentValorantOrder = useValorantOrder()
const desiredDivision = ref(divisions[3])
const desiredMilestone = ref('II')

function changeDesiredDivision(division) {
  desiredDivision.value = division
}

function changeDesiredDivisionMileStone(milestone) {
  desiredMilestone.value = milestone
}

const changeMilestoneToNumber = computed(()=> {
  if (desiredMilestone.value == 'I') return 1;
  if (desiredMilestone.value == 'II') return 2;
  if (desiredMilestone.value == 'III') return 3;
})

async function createOrder() {
  await currentValorantOrder.createOrder({
    customer: useAccount().user._id,
    orderType: 'division',
    desiredRank: {
      division: desiredDivision.value.name,
      milestone: desiredMilestone.value,
    },
  })
}

const imgUrls = import.meta.glob('../../../assets/ranks/valorant/*.png', {
  import: 'default',
  eager: true
})
</script>

<template lang="pug">
.division-boost
  CurrentRank()
  .desired-rank
    v-img(src='@/assets/valorant-player-card.png' width="28rem")
      .content
        .title DESIRED RANK
        v-img.act-rank(src='@/assets/act-rank-level3.png' width="10rem")
          v-img.rank-icon(:src='imgUrls[`../../../assets/ranks/valorant/${desiredDivision.name}-${changeMilestoneToNumber}.png`]' width="3.5rem")
        .title {{ desiredDivision.name }} {{ desiredMilestone }}
        .colors
          v-btn.color(
            v-for="division in divisions"
            :flat="division.name == desiredDivision.name ? false : true"
            icon
            :size="division.name == desiredDivision.name ? '2rem' : '1.5rem'"
            :color="division.color"
            @click="changeDesiredDivision(division)")
        .selections
          v-select(
            v-model="currentValorantOrder.server"
            outline height="20"
            :items="['EUROPE','TURKEY','CHINA']"
            variant="solo"
          )
          .milestones
            div.milestone(
            v-for="milestone in milestones"
            @click="changeDesiredDivisionMileStone(milestone)"
          ) {{ milestone }}
  Checkout(v-on:create-order="createOrder")
    CheckoutSelection(toolTipText="BOOSTER SEÇEBİLİRSİN" title="BOOSTER")
      v-btn(icon="mdi-plus-circle")
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
.milestones {
  display: flex;
  gap: 0.5rem;
}
.milestone {
  width: 2rem;
  height: 2rem;
  border-radius: 5px;
  background-color: #f4f1f0;
  display: flex;
  justify-content: center;
}
.display-flex {
  display: flex;
}
.v-select.v-input--horizontal{
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
}
</style>
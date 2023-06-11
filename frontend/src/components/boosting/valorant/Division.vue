<script setup>
import { ref, computed  } from 'vue'
import CurrentRank from '@/components/boosting/valorant/CurrentRank'
import Checkout from '@/components/Checkout'
import CheckoutSelection from '@/components/CheckoutSelection'
import { valorantDivisions, valorantMilestones  } from '@/constants/valorant-constants'
import { useValorantOrder } from '@/store/valorant-order'
import { useAccount } from '@/store/account'
import SelectCurrentRR from '@/components/boosting/valorant/SelectCurrentRR'
import SelectGainRR from '@/components/boosting/valorant/SelectGainRR'
import SelectServer from '@/components/boosting/valorant/SelectServer'
import SelectBooster from '@/components/boosting/valorant/SelectBooster'
import SelectAgents from '@/components/boosting/valorant/SelectAgents'
import BonusWin from '@/components/boosting/valorant/BonusWin'
import Premium from '@/components/boosting/valorant/Premium'
import HighMmrAndSoloOnly from '@/components/boosting/valorant/HighMmrAndSoloOnly'
import UntrackableOrStream from '@/components/boosting/valorant/UntrackableOrStream'



import CustomSwitch from '@/components/CustomSwitch'



const currentValorantOrder = useValorantOrder()

const divisions = valorantDivisions.slice(0,8)
const milestones = valorantMilestones

const selectedDivisionIndex = ref(4)
const selectedMilestoneIndex = ref(3)

const addCount = computed(() => {
  return milestones.indexOf(currentValorantOrder.milestone) ===  2 ? 1 :0
})

const limitedDivisions = computed(() => {
  return divisions.slice(currentValorantOrder.selectedDivisionIndex + addCount.value)
})

const limitedMilestones = computed(() => {
  if (currentValorantOrder.selectedDivisionIndex === selectedDivisionIndex.value) {
    return milestones.slice(milestones.indexOf(currentValorantOrder.milestone) + 1)
  }
  return milestones
})

const desiredOrder = computed(() => {
  if(!limitedDivisions.value.includes(divisions[selectedDivisionIndex.value])) {
    selectedDivisionIndex.value = divisions.indexOf(limitedDivisions.value[0])
  }

  return divisions[selectedDivisionIndex.value]
})

const desiredMilestone = computed(() => {
  if(!limitedMilestones.value.includes(milestones[selectedMilestoneIndex.value])) {
    selectedMilestoneIndex.value = milestones.indexOf(limitedMilestones.value[0])
  }

  return milestones[selectedMilestoneIndex.value]
})

function changeDesiredDivision(division) {
  selectedDivisionIndex.value = divisions.indexOf(division)
}

function isDesiredDivision(division) {
  return desiredOrder.value.name === division.name
}


function changeMileStone(milestone) {
  selectedMilestoneIndex.value = milestones.indexOf(milestone)
}

function isSelectedMilestone(milestone) {
  return desiredMilestone.value === milestone
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
    division: desiredOrder.value.name,
    milestone: desiredMilestone.value
  })
}
</script>

<template lang="pug">
CurrentRank(title="CURRENT RANK" divisionLimit="7")
  SelectCurrentRR
  SelectGainRR
.desired-rank
  v-img(src='@/assets/valorant-player-card.png' width="23rem")
    .content
      .title DESIRED RANK
      v-img.act-rank(src='@/assets/act-rank-level3.png' width="12rem")
        v-img.rank-background(:src='rankBackgrounds[`../../../assets/rank-background/${desiredOrder.name}.png`]' width="9rem")
          v-img.rank-icon(:src='imgUrls[`../../../assets/ranks/valorant/${desiredOrder.name}-${desiredMilestone}.png`]' width="4.2rem")
      .division-name {{ desiredOrder.name.toUpperCase() }} {{ desiredMilestone }}
      SelectServer.selectServer
      .colors
        .color-background(v-for="division in limitedDivisions")
          v-btn.color(
            :flat="isDesiredDivision(division) ? false : true"
            icon
            :size="isDesiredDivision(division) ? '2rem' : '1.5rem'"
            :color="division.color"
            @click="changeDesiredDivision(division)")
      .milestones
        .milestone(
          v-for="milestone in limitedMilestones"
          :style="{backgroundColor: isSelectedMilestone(milestone) ? desiredOrder.color : '#fff'}"
          @click="changeMileStone(milestone)"
          ) {{ milestone }}
  v-img.last-rank-icon(:src='imgUrls[`../../../assets/ranks/valorant/${desiredOrder.name}-${desiredMilestone}.png`]' width="4.2rem")
Checkout(v-on:create-order="createOrder" checkoutTextColor='#280000' game='valorant')
  template(v-slot:switchs)
    .custom-switch-two-options
      .choice SOLO
      CustomSwitch(v-model="currentValorantOrder.isSolo")
      .choice DUO
  template(v-slot:options)
    SelectBooster
    SelectAgents
    BonusWin
    Premium
    HighMmrAndSoloOnly
    UntrackableOrStream
</template>

<style scoped>
.selectServer {
  padding-top: 2.5rem;
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
  padding-top: 0.75rem
}
.division-name {
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
  padding-top: 1rem;
  padding-bottom: 4.9rem;
  display:flex;
  width: 155px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  height: 4rem;
}
.color-background {
  height: 2rem;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
  padding-top: 1rem;
}
.milestone {
  width: 31px;
  height: 31px;
  border-radius: 5px;
  background-color: #fff;
  font-size: 15px;
  font-weight: 800;
  color: #444;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.last-rank-icon {
  margin: 0 auto;
  margin-top: -8.7rem;
}
</style>
<script setup>
import { ref, computed, onMounted  } from 'vue'
import CurrentRank from '@/components/boosting/valorant/CurrentRank'
import Checkout from '@/components/Checkout'
import CheckoutSelection from '@/components/CheckoutSelection'
import { valorantDivisions, valorantMilestones  } from '@/constants/valorant-constants'
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
import { useValorantOrder } from '@/store/valorant-order'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentValorantOrder = useValorantOrder()

const divisions = valorantDivisions.slice(0,8)
const milestones = valorantMilestones

const checkedColors = ref(false)

onMounted(() => {
  if(currentValorantOrder.selectedDivisionIndex > 6) {
    currentValorantOrder.selectedDivisionIndex = 6
  }
  checkedColors.value = true
})

const addCount = computed(() => {
  return milestones.indexOf(currentValorantOrder.milestone) ===  2 ? 1 :0
})

const limitedDivisions = computed(() => {
  return divisions.slice(currentValorantOrder.selectedDivisionIndex + addCount.value)
})

const limitedMilestones = computed(() => {
  if (currentValorantOrder.selectedDivisionIndex === currentValorantOrder.selectedDesiredDivisionIndex) {
    return milestones.slice(milestones.indexOf(currentValorantOrder.milestone) + 1)
  }
  return milestones
})

const desiredOrder = computed(() => {
  if(!limitedDivisions.value.includes(divisions[currentValorantOrder.selectedDesiredDivisionIndex])) {
    currentValorantOrder.selectedDesiredDivisionIndex = divisions.indexOf(limitedDivisions.value[0])
  }

  return divisions[currentValorantOrder.selectedDesiredDivisionIndex]
})

const desiredMilestone = computed(() => {
  if(!limitedMilestones.value.includes(milestones[currentValorantOrder.desiredMilestone])) {
    currentValorantOrder.desiredMilestone = milestones.indexOf(limitedMilestones.value[0])
  }

  return milestones[currentValorantOrder.desiredMilestone]
})

function changeDesiredDivision(division) {
  currentValorantOrder.selectedDesiredDivisionIndex = divisions.indexOf(division)
}

function isDesiredDivision(division) {
  return desiredOrder.value.name === division.name
}


function changeMileStone(milestone) {
  currentValorantOrder.desiredMilestone = milestones.indexOf(milestone)
}

function isSelectedMilestone(milestone) {
  return desiredMilestone.value === milestone
}

async function createOrder() {
  router.push({
    path: `/complete-payment/valorant/division`,
  })
}

</script>

<template lang="pug">
CurrentRank(title="CURRENT RANK" divisionLimit="7" v-if="checkedColors")
  SelectCurrentRR
  SelectGainRR
.desired-rank(v-if="checkedColors")
  img.player-card(src='@/assets/valorant-player-card.png')
  div
    .content
      .title DESIRED RANK
      img.act-rank(src='@/assets/act-rank-level3.png')
      div
        img.rank-background(:src='`../../src/assets/rank-background/${desiredOrder.name}.png`')
        div.ddd
          img.rank-icon(:src='`../../src/assets/ranks/valorant/${desiredOrder.name}-${desiredMilestone}.png`')
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
  img.last-rank-icon(:src='`../../src/assets/ranks/valorant/${desiredOrder.name}-${desiredMilestone}.png`')
Checkout(v-on:create-order="createOrder" checkoutTextColor='#280000' game='valorant')
  template(v-slot:switchs)
    .custom-switch-two-options
      .choice SOLO
      CustomSwitch(v-model="currentValorantOrder.isDuo")
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
.rank-icon {
  width: 4.2rem;
}
.ddd {
  display:flex;
  justify-content: center;
  align-items: center;
  margin-top: -7.8rem;
}
.rank-background {
  width: 9rem;
  margin-bottom: -4.8rem;
}
.player-card {
  width: 23rem;
  margin-bottom: -49.5rem;
}
.selectServer {
  padding-top: 2.5rem;
}
.desired-rank {
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
  padding-top: 0.75rem
}
.division-name {
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
  font-size: 32px;
  font-weight: 600;
  color: #fff;
  padding-top: 2.5rem;

}
.act-rank {
  display: flex;
  align-items: center;
  width: 12rem;
  margin-bottom: -9.5rem;
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
  margin-top: 5.7rem;
  width: 4.2rem;
}
</style>
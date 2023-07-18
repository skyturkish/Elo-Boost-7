<script setup>
import { ref, computed, onMounted } from 'vue'
import CheckoutSelection from '@/components/CheckoutSelection'
import CurrentRank from '@/components/boosting/league-of-legends/CurrentRank'
import CurrentMilestones from '@/components/boosting/league-of-legends/CurrentMilestones'
import SelectBooster from '@/components/boosting/league-of-legends/SelectBooster'
import SelectCurrentLP from '@/components/boosting/league-of-legends/SelectCurrentLP'
import SelectGainLP from '@/components/boosting/league-of-legends/SelectGainLP'
import SelectChampions from '@/components/boosting/league-of-legends/SelectChampions'
import Checkout from '@/components/Checkout'
import SelectServer from '@/components/boosting/league-of-legends/SelectServer'
import BonusWin from '@/components/boosting/league-of-legends/BonusWin'
import Premium from '@/components/boosting/league-of-legends/Premium'
import HighMmrAndSoloOnly from '@/components/boosting/league-of-legends/HighMmrAndSoloOnly'
import UntrackableOrStream from '@/components/boosting/league-of-legends/UntrackableOrStream'
import SelectQueue from '@/components/boosting/league-of-legends/SelectQueue'
import CustomSwitch from '@/components/CustomSwitch'
import { LeagueOfLegendsDivisions, LeagueOfLegendsMilestones } from '@/constants/league-of-legends-constants'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

const divisions = LeagueOfLegendsDivisions.slice(0,8)
const milestones = LeagueOfLegendsMilestones

const checkedColors = ref(false)


onMounted(() => {
  if(currentLeagueOfLegendsOrder.selectedDivisionIndex > 5) {
    currentLeagueOfLegendsOrder.selectedDivisionIndex = 5
  }
  checkedColors.value = true
})

const addCount = computed(() => {
  return milestones.indexOf(currentLeagueOfLegendsOrder.milestone) === 3 ? 1 :0
})

const limitedDivisions = computed(() => {
  return divisions.slice(currentLeagueOfLegendsOrder.selectedDivisionIndex + addCount.value)
})

const desiredMilestone = computed(() => {
  if(!extralimitedMilestones.value.includes(milestones[currentLeagueOfLegendsOrder.desiredMilestone])) {
    currentLeagueOfLegendsOrder.desiredMilestone = milestones.indexOf(extralimitedMilestones.value[0])
  }

  return milestones[currentLeagueOfLegendsOrder.desiredMilestone]
})
const limitedMilestones = computed(() => {
  if (currentLeagueOfLegendsOrder.selectedDivisionIndex === currentLeagueOfLegendsOrder.selectedDesiredDivisionIndex) {
    return milestones.slice(milestones.indexOf(currentLeagueOfLegendsOrder.milestone) + 1)
  }
  return milestones
})

const extralimitedMilestones = computed(() =>  {
  if(currentLeagueOfLegendsOrder.gainLP === '41+' || currentLeagueOfLegendsOrder.gainLP === '40-36LP') {

    if (currentLeagueOfLegendsOrder.selectedDivisionIndex === currentLeagueOfLegendsOrder.selectedDesiredDivisionIndex) {
      if(currentLeagueOfLegendsOrder.milestone === 'IV') {
        return ['II','I']

      }else if (currentLeagueOfLegendsOrder.milestone === 'III') {

        return ['I']
      }else if (currentLeagueOfLegendsOrder.milestone === 'II') {

      return ['I']
      }

    }
    return ['IV', 'II','I']
  }
  return limitedMilestones.value
})

const desiredOrder = computed(() => {
  if(!limitedDivisions.value.includes(divisions[currentLeagueOfLegendsOrder.selectedDesiredDivisionIndex])) {
    currentLeagueOfLegendsOrder.selectedDesiredDivisionIndex = divisions.indexOf(limitedDivisions.value[0])
  }

  const division = divisions[currentLeagueOfLegendsOrder.selectedDesiredDivisionIndex]

  currentLeagueOfLegendsOrder.desiredDivision = division.name

  return division
})

function increment() {
  currentLeagueOfLegendsOrder.selectedDesiredDivisionIndex++
  currentLeagueOfLegendsOrder.selectedDesiredDivisionIndex = currentLeagueOfLegendsOrder.selectedDesiredDivisionIndex % divisions.length
}

function decrement() {
  currentLeagueOfLegendsOrder.selectedDesiredDivisionIndex -= 1

  if(!limitedMilestones.value.includes(milestones[currentLeagueOfLegendsOrder.desiredMilestone])) {
    currentLeagueOfLegendsOrder.selectedDesiredDivisionIndex = divisions.length - 1
  }
}

function changeDesiredDivision(division) {
  currentLeagueOfLegendsOrder.selectedDesiredDivisionIndex = divisions.indexOf(division)
}

function changeMileStone(milestone) {
  currentLeagueOfLegendsOrder.desiredMilestone = milestones.indexOf(milestone)
}

function isSelectedMilestone(milestone) {
  return desiredMilestone.value === milestone
}

async function createOrder() {
  router.push({
    path: `/complete-payment/league-of-legends/division`,
  })
}

const desiredOrderDisplay = computed(() => {
  if(desiredOrder.value.name != 'master') {
    return desiredOrder.value.name + ' ' + desiredMilestone.value
  }else {
    return desiredOrder.value.name
  }
})

</script>

<template lang="pug">
CurrentRank(divisionLimit = 7 title = "CURRENT RANK" v-if="checkedColors")
  CurrentMilestones
  .selections
    SelectCurrentLP
    SelectGainLP
.desired-rank(v-if="checkedColors")
  .desired-rank-card(:style="{ border: 'solid 2px ' + desiredOrder.borderColor }")
    .desired-rank-title(:style="{color: desiredOrder.dominantColor, backgroundColor: desiredOrder.shadowColor}") DESIRED RANK
    .select-division
      v-icon(size='large' icon="mdi-menu-left" @click="decrement()" :color="currentLeagueOfLegendsOrder.dominantColor")
      .division-name
        img.rank(:src="'https://storage.googleapis.com/divine-boost-bucket/assets/assets/ranks/league-of-legends/' + desiredOrder.name + '.webp'" alt="rank")
        .name(:style="{color: desiredOrder.dominantColor}") {{ desiredOrderDisplay }}
      v-icon(size='large' icon="mdi-menu-right" @click="increment()" :color="currentLeagueOfLegendsOrder.dominantColor")
    v-divider.divider()
    .colors
      .color-background(v-for="division in limitedDivisions")
        v-btn.color(
          :flat="division.name == desiredOrder.name ? false : true"
          icon
          :size="division.name == desiredOrder.name ? '2rem' : '1.5rem'"
          :color="division.buttonColor"
          @click="changeDesiredDivision(division)")
    .desired-mile-stones(:style="{visibility: desiredOrder.name == 'master' ? 'hidden' : 'visible' }")
      div.mile-stone(
      v-for="milestone in extralimitedMilestones"
      :style="{color: isSelectedMilestone(milestone) ? desiredOrder.dominantColor : '#bbb',border: 'solid 1px ' + (isSelectedMilestone(milestone) ? desiredOrder.borderColor : '#bbb')}"
      @click="changeMileStone(milestone)"
      ) {{ milestone }}
    .desired-selections
      SelectServer
      SelectQueue
  img.trim(:src="'https://storage.googleapis.com/divine-boost-bucket/assets/assets/trims/' + desiredOrder.name + '-trim.webp'"  alt="trim")
Checkout(checkoutTextColor="#000747" v-on:create-order="createOrder" :order='currentLeagueOfLegendsOrder.divisionOrder')
  template(v-slot:options)
    SelectBooster
    SelectChampions
    BonusWin
    Premium
    HighMmrAndSoloOnly
    UntrackableOrStream
  template(v-slot:switchs)
    .custom-switch-two-options
      .choice SOLO
      CustomSwitch(v-model="currentLeagueOfLegendsOrder.isDuo")
      .choice DUO

</template>

<style scoped>
.trim {
  width: 22.5rem;
  margin-top: -2rem;
  background: url("https://storage.googleapis.com/divine-boost-bucket/assets/assets/union.webp") no-repeat center center;
}
.desired-rank {
  width: 360px;
  border-radius: 15px;
  background-color: #fff;
  height: 690px;
}
.desired-rank-card {
  border-radius: 15px;
  margin: 0 2px;
  box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);
  height: 42rem;
}
.desired-rank-title {
  font-weight: bold;
  margin-top: 23px;
  text-align:center;
  font-size: 2rem;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}
.select-division {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.division-name {
  margin-top: -2rem;
}
.rank {
  width: 15.625rem;
}
.name {
  padding-top: 0.5rem;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
}
.colors {
  display: flex;
  margin-top: 3rem;
  justify-content: center;
  align-items: center;
  gap: 0.90rem;
}
.color-background {
  height: 2rem;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.divider {
  margin-top: 2rem;
}
.desired-mile-stones {
  display: flex;
  gap: 0.55rem;
  justify-content: center;
  padding-top: 2rem;
}
.mile-stone {
  width: 2rem;
  height: 2rem;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.selections {
  display: flex;
}
.desired-selections {
  display: flex;
  padding-top: 1.43rem;
}

</style>

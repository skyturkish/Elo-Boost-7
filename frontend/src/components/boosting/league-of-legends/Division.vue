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

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

const divisions = LeagueOfLegendsDivisions.slice(0,7)
const milestones = LeagueOfLegendsMilestones

const selectedDivisionIndex = ref(4)
const selectedMilestoneIndex = ref(3)
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

const limitedMilestones = computed(() => {
  if (currentLeagueOfLegendsOrder.selectedDivisionIndex === selectedDivisionIndex.value) {
    return milestones.slice(milestones.indexOf(currentLeagueOfLegendsOrder.milestone) + 1)
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

function increment() {
  selectedDivisionIndex.value++
  selectedDivisionIndex.value = selectedDivisionIndex.value % divisions.length
}

function decrement() {
  selectedDivisionIndex.value -= 1

  if(!limitedMilestones.value.includes(milestones[selectedMilestoneIndex.value])) {
    selectedDivisionIndex.value = divisions.length - 1
  }
}

function changeDesiredDivision(division) {
  selectedDivisionIndex.value = divisions.indexOf(division)
}

function changeMileStone(milestone) {
  selectedMilestoneIndex.value = milestones.indexOf(milestone)
}

function isSelectedMilestone(milestone) {
  return desiredMilestone.value === milestone
}

const divisionUrls = import.meta.glob('../../../assets/ranks/league-of-legends/*.png', {
  import: 'default',
  eager: true
})

const trimUrls = import.meta.glob('../../../assets/trims/*.png', {
  import: 'default',
  eager: true
})

async function createOrder() {
  await currentLeagueOfLegendsOrder.createDivisionOrder({
    division: desiredOrder.value.name,
    milestone: desiredMilestone.value
  })
}
</script>

<template lang="pug">
CurrentRank(divisionLimit = 6 title = "CURRENT RANK" v-if="checkedColors")
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
        .rank-icon-box
          v-img(:src="divisionUrls['../../../assets/ranks/league-of-legends/' + desiredOrder.name + '.png']" width="16rem" )
        .name(:style="{color: desiredOrder.dominantColor}") {{ desiredOrder.name.toUpperCase() }} {{ desiredMilestone }}
      v-icon(size='large' icon="mdi-menu-right" @click="increment()" :color="currentLeagueOfLegendsOrder.dominantColor")
    v-divider.divider()
    .colors
      v-btn.color(
        v-for="division in limitedDivisions"
        :flat="division.name == desiredOrder.name ? false : true"
        icon
        :size="division.name == desiredOrder.name ? '2rem' : '1.5rem'"
        :color="division.buttonColor"
        @click="changeDesiredDivision(division)")
    .desired-mile-stones
      div.mile-stone(
      v-for="milestone in limitedMilestones"
      :style="{color: isSelectedMilestone(milestone) ? desiredOrder.dominantColor : '#bbb',border: 'solid 1px ' + (isSelectedMilestone(milestone) ? desiredOrder.borderColor : '#bbb')}"
      @click="changeMileStone(milestone)"
      ) {{ milestone }}
    .desired-selections
      SelectServer
      SelectQueue
  v-img.trim(src="../../../assets/union.png")
    v-img(:src="trimUrls['../../../assets/trims/' + desiredOrder.name + '-trim.png']" )
Checkout(checkoutTextColor="#000747" v-on:create-order="createOrder")
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
      CustomSwitch(v-model="currentLeagueOfLegendsOrder.isSolo")
      .choice DUO

</template>

<style scoped>
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
.rank-icon-box {
  height: 15.625rem;
  width: 15.625rem;
}
.name {
  padding-top: 0.5rem;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
}
.colors {
  display: flex;
  margin-top: 3rem;
  justify-content: center;
  align-items: center;
  gap: 0.90rem;
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
.trim {
  margin-top: -2rem;
}
</style>

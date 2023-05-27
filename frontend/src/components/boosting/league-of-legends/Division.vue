<script setup>
import { ref, computed } from 'vue'
import CheckoutSelection from '@/components/CheckoutSelection'
import CurrentRank from '@/components/boosting/league-of-legends/CurrentRank'
import CurrentMilestones from '@/components/boosting/league-of-legends/CurrentMilestones'
import Checkout from '@/components/Checkout'
import SelectServer from '@/components/boosting/league-of-legends/SelectServer'
import SelectQueue from '@/components/boosting/league-of-legends/SelectQueue'
import SelectGainLP from '@/components/boosting/league-of-legends/SelectGainLP'
import { LeagueOfLegendsDivisions, LeagueOfLegendsMilestones } from '@/constants/league-of-legends-constants'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'
import axios from 'axios'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

const divisions = LeagueOfLegendsDivisions.slice(0,7)
const milestones = LeagueOfLegendsMilestones

const desiredMilestone = ref('I')
const selectedIndex = ref(4)

const desiredOrder = computed(() => {
  return divisions[selectedIndex.value % divisions.length]
})

const limitedDivisions = computed(() => {
  if(currentLeagueOfLegendsOrder.colors.rank >= desiredOrder.value.rank) {
    selectedIndex.value += 1 + currentLeagueOfLegendsOrder.colors.rank - desiredOrder.value.rank
  }

  return divisions.slice(currentLeagueOfLegendsOrder.colors.rank)
})

function increment() {
  selectedIndex.value++
  selectedIndex.value = selectedIndex.value % divisions.length
}

function decrement() {
  selectedIndex.value -= 1

  if (selectedIndex.value < currentLeagueOfLegendsOrder.colors.rank) {
    selectedIndex.value = divisions.length - 1
  }
}

function changeDesiredDivision(division) {
  selectedIndex.value = divisions.indexOf(division)
}

function changeMileStone(milestone) {
  desiredMilestone.value = milestone
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
.division
  CurrentRank(divisionLimit = 6 title = "CURRENT RANK")
    CurrentMilestones
    .selections
      v-select(:items="['0-20LP','20-40LP','40-60LP','60-80LP','80-100LP']" v-model="currentLeagueOfLegendsOrder.currentLP").selection-Current-LP
      v-select(:items="['+25','25-20LP','20-15LP','15-10LP','10-']" v-model="currentLeagueOfLegendsOrder.gainLP").selection-Gain-Lp
  .desired-rank
    .desired-rank-card(:style="{ border: 'solid 2px ' + desiredOrder.borderColor }")
      .desired-rank-title(:style="{color: desiredOrder.dominantColor, backgroundColor: desiredOrder.shadowColor}") DESIRED RANK
      .select-division
        v-icon(icon="mdi-menu-left" @click="decrement()" :color="currentLeagueOfLegendsOrder.dominantColor")
        .division-name
          .rank-icon-box
            v-img(:src="divisionUrls['../../../assets/ranks/league-of-legends/' + desiredOrder.name + '.png']" width="16rem" )
          .name(:style="{color: desiredOrder.dominantColor}") {{ desiredOrder.name.toUpperCase() }} {{ desiredMilestone }}
        v-icon(icon="mdi-menu-right" @click="increment()" :color="currentLeagueOfLegendsOrder.dominantColor")
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
        v-for="milestone in milestones"
        :style="{color: isSelectedMilestone(milestone) ? desiredOrder.dominantColor : '#bbb',border: 'solid 1px ' + (isSelectedMilestone(milestone) ? desiredOrder.borderColor : '#bbb')}"
        @click="changeMileStone(milestone)"
        ) {{ milestone }}
      .desired-selections
        SelectServer
        SelectQueue
    v-img.trim(src="../../../assets/union.png")
      v-img(:src="trimUrls['../../../assets/trims/' + desiredOrder.name + '-trim.png']" )
  Checkout(v-on:create-order="createOrder")
</template>

<style scoped>
.division {
  display: flex;
  justify-content: center;
  max-width: 1440px;
  margin: 0 auto;
  flex-wrap: wrap;
  background-color: #eeeeee;
  padding: 0 2.75rem;
}
.desired-rank {
  width: 360px;
  margin: 0 auto;
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
.rank-icon-box {
  height: 15.625rem;
  width: 15.625rem;
}
.name {
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

<script setup>
import { ref } from 'vue'
import CheckoutSelection from '@/components/CheckoutSelection'
import CurrentRank from '@/components/boosting/league-of-legends/CurrentRank'
import Checkout from '@/components/Checkout'
import { LeagueOfLegendsDivisions, LeagueOfLegendsMilestones } from '@/constants/league-of-legends-constants'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

const divisions = LeagueOfLegendsDivisions
const milestones = LeagueOfLegendsMilestones

let selectedIndex = 4
const desiredOrder = ref(divisions[selectedIndex])

const desiredMilestone = ref('I')
const server = ref('Turkey')

function increment(isIncrement) {
  selectedIndex = isIncrement ? selectedIndex + 1 : selectedIndex - 1

  desiredOrder.value = divisions[selectedIndex % 7]
}

function changeDesiredDivision(division) {
  desiredOrder.value = division
}

function changeMileStone(milestone) {
  desiredMilestone.value = milestone
}

const divisionUrls = import.meta.glob('../../../assets/ranks/league-of-legends/*.png', {
  import: 'default',
  eager: true
})

const trimUrls = import.meta.glob('../../../assets/trims/*.png', {
  import: 'default',
  eager: true
})
</script>

<template lang="pug">
.division
  CurrentRank()
  .desired-rank
    .desired-rank-card(:style="`border: solid 5px ${desiredOrder.color}`")
      .desired-rank-title(:style="{color: desiredOrder.color, backgroundColor: '#f4f1f0'}") DESIRED RANK
      .select-division
        v-icon(icon="mdi-menu-left" @click="increment(false)")
        .division-name
          v-img(:src="divisionUrls['../../../assets/ranks/league-of-legends/' + desiredOrder.name + '.png']" width="16rem" )
          .name(:style="{color: desiredOrder.color}") {{ desiredOrder.name }} {{ desiredMilestone }}
        v-icon(icon="mdi-menu-right" @click="increment(true)")
      .colors
        v-btn.color(
          v-for="division in divisions"
          :flat="division.name == desiredOrder.name ? false : true"
          icon
          :size="division.name == desiredOrder.name ? '2rem' : '1.5rem'"
          :color="division.color"
          @click="changeDesiredDivision(division)")
      .mile-stones
        div.mile-stone(
        v-for="divisionMileStone in milestones"
        :style="{backgroundColor: desiredMilestone == divisionMileStone ? '#afafaf' : '#f4f1f0'}"
        @click="changeMileStone(divisionMileStone)"
        ) {{ divisionMileStone }}
      .selections
        v-select(:items="['Turkey','China']" v-model="currentLeagueOfLegendsOrder.server")
        v-select(:items="['solo','flex']" v-model="currentLeagueOfLegendsOrder.queue")
    v-img.trim(src="../../../assets/union.png")
      v-img(:src="trimUrls['../../../assets/trims/' + desiredOrder.name + '-trim.png']" )
  Checkout
</template>

<style scoped>

.division {
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  padding-top: 2rem;
  flex-wrap: wrap;
  gap: 3rem;
  background-color: #f1f1f1;
}

.desired-rank {
  width: 360px;
  margin: 0 auto;
  border-radius: 15px;
}
.desired-rank-card {
  border-radius: 15px;
  margin: 0 2px;
  box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);
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
.name {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
}
.colors {
  display: flex;
  margin-top: 5rem;
  justify-content: center;
  align-items: center;
  gap: 0.90rem;
}

.mile-stones {
  display: flex;
  gap: 0.55rem;
  justify-content: center;
  margin-top: 1.75rem;
}
.mile-stone {
  width: 2rem;
  height: 2rem;
  border-radius: 5px;
  background-color: #f4f1f0;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.selections {
  display: flex;
  margin-top: 2.15rem;
}
.trim {
  margin-top: -3rem
}
</style>

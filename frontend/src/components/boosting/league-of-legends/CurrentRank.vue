<script setup>
import { ref, computed } from 'vue'
import { LeagueOfLegendsDivisions, LeagueOfLegendsMilestones } from '@/constants/league-of-legends-constants'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const divisions = LeagueOfLegendsDivisions
const milestones = LeagueOfLegendsMilestones

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()
const currentRank = currentLeagueOfLegendsOrder.currentRank
let selectedIndex = 4
const selectDivision = ref(divisions[selectedIndex % 7])

function increment(isIncrement) {
  selectedIndex = isIncrement ? selectedIndex + 1 : selectedIndex - 1

  selectDivision.value = divisions[selectedIndex % 7]

  currentRank.division = selectDivision.value.name
  currentLeagueOfLegendsOrder.color = selectDivision.value.color
}

function changeCurrentDivision(division) {
  currentRank.division = division.name
  currentLeagueOfLegendsOrder.color = division.color
}

function changeMileStone(milestone) {
  currentRank.milestone = milestone
}

const divisionUrls = import.meta.glob('../../../assets/ranks/league-of-legends/*.png', {
  import: 'default',
  eager: true
})

const trimUrls = import.meta.glob('../../../assets/trims/*.png', {
  import: 'default',
  eager: true
})

const currentDivisionName = computed(() => {
  return currentRank.division.toUpperCase()
});

</script>

<template lang="pug">
.current-rank
  .current-rank-card(:style="`border: solid 5px ${currentLeagueOfLegendsOrder.color}`")
    .current-rank-title(:style="{color: currentLeagueOfLegendsOrder.color, backgroundColor: '#f4f1f0'}") CURRENT RANK
    .select-division
      v-icon(icon="mdi-menu-left" @click="increment(false)")
      .division-name
        v-img(:src="divisionUrls['../../../assets/ranks/league-of-legends/' + currentRank.division + '.png']" width="16rem" )
        .name(:style="{color: currentLeagueOfLegendsOrder.color}") {{ currentDivisionName }} {{ currentRank.milestone }}
      v-icon(icon="mdi-menu-right" @click="increment(true)")
    .colors
      v-btn.color(
        v-for="division in divisions"
        :flat="division.name == currentRank.division ? false : true"
        icon
        :size="division.name == currentRank.division ? '2rem' : '1.5rem'"
        :color="division.color"
        @click="changeCurrentDivision(division)")
    .mile-stones
      div.mile-stone(
      v-for="divisionMileStone in milestones"
      :style="{backgroundColor: currentRank.milestone == divisionMileStone ? '#afafaf' : '#f4f1f0'}"
      @click="changeMileStone(divisionMileStone)"
      ) {{ divisionMileStone }}
    .selections
      v-select(:items="['0-20LP','20-40LP','40-60LP','60-80LP','80-100LP']" v-model="currentRank.currentLP").selection-Current-LP
      v-select(:items="['+25','25-20LP','20-15LP','15-10LP','10-']" v-model="currentLeagueOfLegendsOrder.gainLP").selection-Gain-Lp
  v-img.trim(src="../../../assets/union.png")
    v-img(:src="trimUrls['../../../assets/trims/' + currentRank.division + '-trim.png']" )
</template>

<style scoped>

.current-rank {
  width: 360px;
  margin: 0 auto;
  border-radius: 15px;
}
.current-rank-card {
  border-radius: 15px;
  margin: 0 2px;
  box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);
}
.current-rank-title {
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
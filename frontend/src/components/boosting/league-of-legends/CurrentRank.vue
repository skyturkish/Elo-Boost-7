<script setup>
import { ref, computed } from 'vue'
import { LeagueOfLegendsDivisions } from '@/constants/league-of-legends-constants'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const divisions = LeagueOfLegendsDivisions

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()
const currentRank = currentLeagueOfLegendsOrder.currentRank

const divisionUrls = import.meta.glob('../../../assets/ranks/league-of-legends/*.png', {
  import: 'default',
  eager: true
})

const trimUrls = import.meta.glob('../../../assets/trims/*.png', {
  import: 'default',
  eager: true
})

const currentDivisionName = computed(() => {
  return currentLeagueOfLegendsOrder.colors.name.toUpperCase()
});
</script>

<template lang="pug">
.current-rank
  .current-rank-card(:style="`border: solid 2px ${currentLeagueOfLegendsOrder.colors.borderColor}`")
    .current-rank-title(:style="{color: currentLeagueOfLegendsOrder.colors.dominantColor, backgroundColor: currentLeagueOfLegendsOrder.colors.shadowColor}") CURRENT RANK
    .select-division
      v-icon(icon="mdi-menu-left" @click="currentLeagueOfLegendsOrder.decrementDivision(8)" :color="currentLeagueOfLegendsOrder.colors.dominantColor")
      .division-name
        v-img(:src="divisionUrls['../../../assets/ranks/league-of-legends/' + currentLeagueOfLegendsOrder.colors.name + '.png']" width="16rem" )
        .name(:style="{color: currentLeagueOfLegendsOrder.colors.dominantColor}") {{ currentDivisionName }} {{ currentRank.milestone }}
      v-icon(icon="mdi-menu-right" @click="currentLeagueOfLegendsOrder.incrementDivision()" :color="currentLeagueOfLegendsOrder.colors.dominantColor")
    v-divider.divider()
    .colors
      v-btn.color(
        v-for="division in divisions"
        :flat="division.name == currentLeagueOfLegendsOrder.colors.name ? false : true"
        icon
        :size="division.name == currentLeagueOfLegendsOrder.colors.name ? '2rem' : '1.5rem'"
        :color="division.buttonColor"
        @click="currentLeagueOfLegendsOrder.changeCurrentDivision(division)")
    .dynamic-view
      slot
  v-img.trim(src="../../../assets/union.png" width="23.5rem")
    v-img(:src="trimUrls['../../../assets/trims/' + currentLeagueOfLegendsOrder.colors.name + '-trim.png']" )
</template>

<style scoped>
.current-rank {
  width: 22.5rem;
  border-radius: 15px;
  margin: 0 auto;
  background-color: #fff;
  height: 42rem;
}
.current-rank-card {
  border-radius: 15px;
  box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #fff;
  height: 42rem;
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
.divider {
  margin-top: 2rem;
}
.colors {
  display: flex;
  margin-top: 3rem;
  justify-content: center;
  align-items: center;
  gap: 0.90rem;
}
.dynamic-view {
  padding-top: 2rem;
  display:flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 1.43rem;
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
  margin-top: -3rem;
}
</style>
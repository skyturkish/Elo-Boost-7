<script setup>
import { ref, computed } from 'vue'
import { LeagueOfLegendsDivisions } from '@/constants/league-of-legends-constants'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const props = defineProps({
  divisionLimit: {
    type: String,
  },
  title: {
    type: String,
    required: true
  }
})

const divisions = LeagueOfLegendsDivisions.slice(0, props.divisionLimit)

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

const currentDivisionName = computed(() => {
  return currentLeagueOfLegendsOrder.colors.name.toUpperCase()
});
</script>

<template lang="pug">
.current-rank
  .current-rank-card(:style="`border: solid 2px ${currentLeagueOfLegendsOrder.colors.borderColor}`")
    .current-rank-title(:style="{color: currentLeagueOfLegendsOrder.colors.dominantColor, backgroundColor: currentLeagueOfLegendsOrder.colors.shadowColor}") {{ title }}
    .select-division
      v-icon(size='large' icon="mdi-menu-left" @click="currentLeagueOfLegendsOrder.decrementDivision(divisionLimit)" :color="currentLeagueOfLegendsOrder.colors.dominantColor")
      .division-name
        .rank-icon-box
          img.rank-icon(:src="'https://storage.googleapis.com/divine-boost-bucket/assets/assets/ranks/league-of-legends/' + currentLeagueOfLegendsOrder.colors.name + '.webp'")
        .name(:style="{color: currentLeagueOfLegendsOrder.colors.dominantColor}") {{ currentDivisionName }} {{ currentLeagueOfLegendsOrder.milestone }}
      v-icon(size='large' icon="mdi-menu-right" @click="currentLeagueOfLegendsOrder.incrementDivision(divisionLimit)" :color="currentLeagueOfLegendsOrder.colors.dominantColor")
    v-divider.divider()
    .colors-exception(v-if="props.divisionLimit == 6")
      .exception-colors
        .color-background(v-for="division in divisions")
          v-btn.color(
            :flat="division.name == currentLeagueOfLegendsOrder.colors.name ? false : true"
            icon
            :size="division.name == currentLeagueOfLegendsOrder.colors.name ? '2rem' : '1.5rem'"
            :color="division.buttonColor"
            @click="currentLeagueOfLegendsOrder.changeCurrentDivision(division)")
    .colors(v-else)
      .first-colors
        .color-background(v-for="division in divisions.slice(0,4)")
          v-btn.color(
            :flat="division.name == currentLeagueOfLegendsOrder.colors.name ? false : true"
            icon
            :size="division.name == currentLeagueOfLegendsOrder.colors.name ? '2rem' : '1.5rem'"
            :color="division.buttonColor"
            @click="currentLeagueOfLegendsOrder.changeCurrentDivision(division)")
      .second-colors
        .color-background(v-for="division in divisions.slice(4,props.divisionLimit)")
          v-btn.color(
            :flat="division.name == currentLeagueOfLegendsOrder.colors.name ? false : true"
            icon
            :size="division.name == currentLeagueOfLegendsOrder.colors.name ? '2rem' : '1.5rem'"
            :color="division.buttonColor"
            @click="currentLeagueOfLegendsOrder.changeCurrentDivision(division)")
    .dynamic-view
      slot   bronze-trim.
  img.trim(:src="'https://storage.googleapis.com/divine-boost-bucket/assets/assets/trims/' + currentLeagueOfLegendsOrder.colors.name + '-trim.webp'" )
</template>

<style scoped>
.trim {
  width: 22.5rem;
  margin-top: -2rem;
  background: url("https://storage.googleapis.com/divine-boost-bucket/assets/assets/union.webp") no-repeat center center;
}
.current-rank {
  width: 22.5rem;
  border-radius: 15px;
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
.division-name {
  margin-top: -2rem;
}
.rank-icon-box {
  height: 15.625rem;
  width: 15.625rem;
}
.rank-icon {
  height: 250px;
  width: 250px;
  display:flex;
  justify-content: center;
  align-items: center;
  padding-bottom: -5rem;
}
.name {
  padding-top: 0.5rem;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
}
.divider {
  margin-top: 2rem;
}
.colors {
  margin-top: 1.75rem;
}
.exception-colors {
  margin-top: 3rem;
  padding-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.90rem;
  flex-wrap: wrap;
}
.second-colors,
.first-colors {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.90rem;
  flex-wrap: wrap;
}
.second-colors {
  margin-top: 0.75rem;
}
.color-background {
  height: 2rem;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dynamic-view {
  padding-top: 1rem;
  display:flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
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
.union {
  margin-top: -2rem;
}
</style>
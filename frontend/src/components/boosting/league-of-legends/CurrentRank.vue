<script setup>
import { computed } from 'vue'
import { LeagueOfLegendsDivisions } from '@/constants/league-of-legends-constants'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const props = defineProps({
  divisionLimit: {
    type: String,
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
  }
})

const divisions = LeagueOfLegendsDivisions.slice(0, props.divisionLimit)

const limitedDivisions = computed(() => {
    return divisions
})

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

</script>

<template lang="pug">
.current-rank
  .current-rank-card(:style="`border: solid 2px ${currentLeagueOfLegendsOrder.colors.borderColor}`")
    .current-rank-title(:style="{color: currentLeagueOfLegendsOrder.colors.dominantColor, backgroundColor: currentLeagueOfLegendsOrder.colors.shadowColor}") {{ title }}
    .select-division
      v-icon(size='large' icon="mdi-menu-left" @click="currentLeagueOfLegendsOrder.decrementDivision(divisionLimit)" :color="currentLeagueOfLegendsOrder.colors.dominantColor")
      .division-name
        .rank-icon-box
          img.rank-icon(:src="'https://storage.googleapis.com/divine-boost-bucket/assets/assets/ranks/league-of-legends/' + currentLeagueOfLegendsOrder.colors.name + '.webp'" alt="rank-icon")
        .name(:style="{color: currentLeagueOfLegendsOrder.colors.dominantColor}") {{ currentLeagueOfLegendsOrder.displayCurrentRank }}
      v-icon(size='large' icon="mdi-menu-right" @click="currentLeagueOfLegendsOrder.incrementDivision(divisionLimit)" :color="currentLeagueOfLegendsOrder.colors.dominantColor")
    v-divider.divider()
    .colors-exception(v-if="props.divisionLimit == 7")
      .exception-colors
        .color-background(v-for="division in limitedDivisions")
          v-btn.color(
            :flat="division.name == currentLeagueOfLegendsOrder.colors.name ? false : true"
            icon
            :size="division.name == currentLeagueOfLegendsOrder.colors.name ? '2rem' : '1.5rem'"
            :color="division.buttonColor"
            @click="currentLeagueOfLegendsOrder.changeCurrentDivision(division)")
    .colors(v-else)
      .first-colors
        .color-background(v-for="division in limitedDivisions.slice(0,5)")
          v-btn.color(
            :flat="division.name == currentLeagueOfLegendsOrder.colors.name ? false : true"
            icon
            :size="division.name == currentLeagueOfLegendsOrder.colors.name ? '2rem' : '1.5rem'"
            :color="division.buttonColor"
            @click="currentLeagueOfLegendsOrder.changeCurrentDivision(division)")
      .second-colors
        .color-background(v-for="division in limitedDivisions.slice(5,props.divisionLimit)")
          v-btn.color(
            :flat="division.name == currentLeagueOfLegendsOrder.colors.name ? false : true"
            icon
            :size="division.name == currentLeagueOfLegendsOrder.colors.name ? '2rem' : '1.5rem'"
            :color="division.buttonColor"
            @click="currentLeagueOfLegendsOrder.changeCurrentDivision(division)")
    .dynamic-view
      slot
  img.trim(:src="'https://storage.googleapis.com/divine-boost-bucket/assets/assets/trims/' + currentLeagueOfLegendsOrder.colors.name + '-trim.webp'"  alt="trim")
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
  text-transform: uppercase;
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
  margin-right: -1.5rem;
}
.first-colors {
  margin-left: -3rem;
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
  display:flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem 3rem 0.5rem 3rem;;
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
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
    .current-rank-title(:style="{color: currentLeagueOfLegendsOrder.colors.dominantColor, backgroundColor: currentLeagueOfLegendsOrder.colors.shadowColor}") {{ title }}
    .select-division
      v-icon(size='large' icon="mdi-menu-left" @click="currentLeagueOfLegendsOrder.decrementDivision(divisionLimit)" :color="currentLeagueOfLegendsOrder.colors.dominantColor")
      .division-name
        .rank-icon-box
          v-img.rank-icon(:src="divisionUrls['../../../assets/ranks/league-of-legends/' + currentLeagueOfLegendsOrder.colors.name + '.png']")
        .name(:style="{color: currentLeagueOfLegendsOrder.colors.dominantColor}") {{ currentDivisionName }} {{ currentLeagueOfLegendsOrder.milestone }}
      v-icon(size='large' icon="mdi-menu-right" @click="currentLeagueOfLegendsOrder.incrementDivision(divisionLimit)" :color="currentLeagueOfLegendsOrder.colors.dominantColor")
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
.division-name {
  margin-top: -2rem;
}
.rank-icon-box {
  height: 15.625rem;
  width: 15.625rem;
}
.rank-icon {
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
  display: flex;
  margin-top: 3rem;
  justify-content: center;
  align-items: center;
  gap: 0.90rem;
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
.trim {
  margin-top: -2rem;
}
</style>
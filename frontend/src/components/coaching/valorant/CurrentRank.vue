<script setup>
import { ref, computed } from 'vue'
import { valorantDivisions } from '@/constants/valorant-constants'
import { useValorantOrder } from '@/store/valorant-order'
import CurrentMilestones from '@/components/boosting/valorant/CurrentMilestones'

const props = defineProps({
  divisionLimit: {
    type: String,
  }
})

const divisions = valorantDivisions.slice(0, props.divisionLimit)

const currentValorantOrder = useValorantOrder()

const currentDivisionName = computed(() => {
  return currentValorantOrder.currentRank.division.toUpperCase()
});
</script>

<template lang="pug">
.valorant-card
  v-img(src='@/assets/valorant-coaching-card.png')
    .content
      .title YOUR RANK
      v-img.act-rank(src='@/assets/act-rank-level2.png'  width="12rem")
        v-img.rank-background(:src='`../../src/assets/rank-background/${currentValorantOrder.currentRank.division}.png`' width="9rem")
          v-img.rank-icon(:src='`../../src/assets/ranks/valorant/${currentValorantOrder.currentRank.division}-${currentValorantOrder.milestone}.png`' width="4.2rem")
      .division-name {{ currentDivisionName }}
      .dynamic-view
        slot
      .colors
        .color-background(v-for="division in divisions")
          v-btn.color(
            :flat="currentValorantOrder.isSelectedDivision(division) ? false : true"
            icon
            :size="currentValorantOrder.isSelectedDivision(division) ? '2rem' : '1.5rem'"
            :color="division.color"
            @click="currentValorantOrder.changeCurrentDivision(division)")
      v-img.last-rank-icon(:src='`../../src/assets/ranks/valorant/${currentValorantOrder.currentRank.division}-${currentValorantOrder.milestone}.png`' width="4.2rem")
</template>

<style scoped>
.valorant-card {
  width: 23rem;
}
.content {
  padding-top: 3.6rem;
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
}
.act-rank {
  display: flex;
  align-items: center;
}
.rank-background {
  margin: 0 auto
}
.rank-icon {
  margin: 0 auto;
  margin-top: 31%;
}
.colors {
  padding-top: 2rem;
  padding-bottom: 1.7rem;
  display:flex;
  max-width: 165px;
  flex-wrap: wrap;
  justify-content: space-evenly;
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
.dynamic-view {
  height: 6.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  padding-top: 3.5rem;
}
.last-rank-icon {
  margin-top: 7.5rem;
}
</style>

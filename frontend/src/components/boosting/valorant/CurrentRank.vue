<script setup>
import { ref, computed } from 'vue'
import { valorantDivisions } from '@/constants/valorant-constants'
import { useValorantOrder } from '@/store/valorant-order'
import CurrentMilestones from '@/components/boosting/valorant/CurrentMilestones'

const props = defineProps({
  divisionLimit: {
    type: String,
  },
  title: {
    type: String,
    required: true
  }
})

const divisions = valorantDivisions.slice(0, props.divisionLimit)

const currentValorantOrder = useValorantOrder()

const imgUrls = import.meta.glob('../../../assets/ranks/valorant/*.png', {
  import: 'default',
  eager: true
})

const rankBackgrounds = import.meta.glob('../../../assets/rank-background/*.png', {
  import: 'default',
  eager: true
})

const currentDivisionName = computed(() => {
  return currentValorantOrder.currentRank.division.toUpperCase()
});
</script>

<template lang="pug">
.current-rank
  v-img(src='@/assets/valorant-player-card.png' width="23rem")
    .content
      .title {{ title}}
      v-img.act-rank(src='@/assets/act-rank-level1.png'  width="12rem")
        v-img.rank-background(:src='rankBackgrounds[`../../../assets/rank-background/${currentValorantOrder.currentRank.division}.png`]' width="9rem")
          v-img.rank-icon(:src='imgUrls[`../../../assets/ranks/valorant/${currentValorantOrder.currentRank.division}-${currentValorantOrder.milestone}.png`]' width="4.2rem")
      .title {{ currentDivisionName }} {{ currentValorantOrder.milestone }}
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
      CurrentMilestones
      v-img.last-rank-icon(:src='imgUrls[`../../../assets/ranks/valorant/${currentValorantOrder.currentRank.division}-${currentValorantOrder.milestone}.png`]' width="4.2rem")
</template>

<style scoped>
.current-rank {
  margin: 0 auto
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
  padding-bottom: 1rem;
  display:flex;
  max-width: 155px;
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
  padding-top: 4.5rem;
}
.last-rank-icon {
  margin-top: 7rem;
}
</style>

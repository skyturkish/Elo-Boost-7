<script setup>
import { useValorantOrder } from '@/store/valorant-order'
import { valorantDivisions } from '@/constants/valorant-constants'
import CurrentMilestones from '@/components/boosting/valorant/CurrentMilestones'
import SelectCurrentRR from '@/components/boosting/valorant/SelectCurrentRR'

const divisions = valorantDivisions
const currentValorantOrder = useValorantOrder()

const imgUrls = import.meta.glob('../../../assets/ranks/valorant/*.png', {
  import: 'default',
  eager: true
})

function adana(se) {
  if (se == 'I') return 1;
  if (se == 'II') return 2;
  if (se == 'III') return 3;
}

const rankBackgrounds = import.meta.glob('../../../assets/rank-background/*.png', {
  import: 'default',
  eager: true
})
</script>

<template lang="pug">
.current-rank
  v-img(src='@/assets/valorant-player-card.png' width="23rem")
    .content
      .title CURRENT RANK
      v-img.act-rank(src='@/assets/act-rank-level1.png'  width="12rem")
        v-img.rank-background(:src='rankBackgrounds[`../../../assets/rank-background/${currentValorantOrder.division}.png`]' width="9rem")
          v-img.rank-icon(:src='imgUrls[`../../../assets/ranks/valorant/${currentValorantOrder.division}-${adana(currentValorantOrder.milestone)}.png`]' width="4.2rem")
      .title {{ currentValorantOrder.division.toUpperCase() }} {{ currentValorantOrder.milestone }}
      .colors
        v-btn.color(
          v-for="division in divisions"
          :flat="currentValorantOrder.isSelectedDivision(division) ? false : true"
          icon
          :size="currentValorantOrder.isSelectedDivision(division) ? '2rem' : '1.6rem'"
          :color="division.color"
          @click="currentValorantOrder.changeCurrentDivision(division)")
      .selections
        SelectCurrentRR
        CurrentMilestones
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
  padding-top: 13rem;
}
.color {
  margin-left: 0.5rem;
}
.selections {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding-top: 1.5rem;
}
/* .v-select.v-input--horizontal{
  grid-template-areas: 'reset';
}
.v-select > .v-input__control > .v-field{
  font-size: 8px;
} */
</style>

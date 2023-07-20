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

</script>

<template lang="pug">
.valorant-card
  img.player-card(src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/valorant-player-card.webp' alt='player-card')
  div
    .content
      .title {{ title}}
      img.act-rank(src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/act-rank-level1.webp' alt='act-rank')
      div
        img.rank-background(:src='`https://storage.googleapis.com/divine-boost-bucket/assets/assets/rank-background/${currentValorantOrder.currentRank.division}.webp`' :alt='currentValorantOrder.currentRank.division')
        div.ddd
          img.rank-icon(:src='`https://storage.googleapis.com/divine-boost-bucket/assets/assets/ranks/valorant/${currentValorantOrder.currentRank.division}-${currentValorantOrder.milestone}.webp`' alt='rank-icon')
      .division-name {{ currentValorantOrder.currentRank.division }} {{ currentValorantOrder.milestone }}
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
      img.last-rank-icon(:src='`https://storage.googleapis.com/divine-boost-bucket/assets/assets/ranks/valorant/${currentValorantOrder.currentRank.division}-${currentValorantOrder.milestone}.webp`' alt='last-rank-icon')
</template>

<style scoped>
.ddd {
  display:flex;
  justify-content: center;
  align-items: center;
}
.valorant-card {
  width: 23rem;
}
.player-card {
  width: 23rem;
  margin-bottom: -49.5rem;
}
.content {
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
  padding-top: 2rem;
  text-transform: uppercase;
}
.act-rank {
  display: flex;
  align-items: center;
  width: 12rem;
  margin-bottom: -9.5rem;
}
.rank-background {
  width: 9rem;
  margin-bottom: -4.8rem;
}
.rank-icon {
  width: 4.2rem;
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
  width: 4.2rem;
  margin-top: 6rem;
}
</style>

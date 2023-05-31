<script setup>
import { ref } from 'vue'
import { LeagueOfLegendsMilestones } from '@/constants/league-of-legends-constants'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()
const milestones = LeagueOfLegendsMilestones

</script>

<template lang="pug">
.milestones
  .milestone(
  v-for="milestone in milestones"
  :style="{color: currentLeagueOfLegendsOrder.isSelectedMilestone(milestone) ? currentLeagueOfLegendsOrder.colors.dominantColor : '#bbb',border: 'solid 1px ' + (currentLeagueOfLegendsOrder.isSelectedMilestone(milestone) ? currentLeagueOfLegendsOrder.colors.borderColor : '#bbb')}"
  @click="currentLeagueOfLegendsOrder.changeCurrentMileStone(milestone)"
  ) {{ milestone }}
</template>

<style scoped>
.milestones {
  display: flex;
  gap: 0.55rem;
  justify-content: center;
}
.milestone {
  width: 2rem;
  height: 2rem;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>

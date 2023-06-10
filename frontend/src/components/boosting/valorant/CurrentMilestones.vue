<script setup>
import { valorantMilestones } from '@/constants/valorant-constants'
import { useValorantOrder } from '@/store/valorant-order'

const currentValorantOrder = useValorantOrder()

const milestones = valorantMilestones

</script>

<template lang="pug">
.milestones
  .milestone(
    v-for="milestone in milestones"
    :style="{backgroundColor: currentValorantOrder.isSelectedMilestone(milestone) ? currentValorantOrder.colors.color : '#fff'}"
    @click="currentValorantOrder.changeCurrentMileStone(milestone)"
    ) {{ milestone }}
</template>

<style scoped>
.milestones {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}
.milestone {
  font-family: Inter;
  width: 31px;
  height: 31px;
  flex-grow: 0;
  border-radius: 5px;
  background-color: #fff;
  font-size: 15px;
  font-weight: 800;
  color: #444;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>

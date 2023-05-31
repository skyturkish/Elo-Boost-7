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
    :style="{backgroundColor: currentValorantOrder.isSelectedMilestone(milestone) ? '#f4f1f0' : '#afafaf'}"
    @click="useValorantOrder().changeCurrentMileStone(milestone)"
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
  width: 1.9375rem;
  height: 1.9375rem;
  border-radius: 6px;
  background-color: #afafaf;
  font-size: 15px;
  font-weight: 800;
  color: #444;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>

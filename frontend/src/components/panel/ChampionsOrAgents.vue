<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

const selectedLane = ref(props.order.lanes[0])

const heroes = computed(() => {
  if (props.order == null || Object.values(props.order.heroes).flat().length == 0) return []

  return props.order.heroes[selectedLane.value]
})

function changeSelectedLane(lane) {
  selectedLane.value = lane
}

function isLaneSelected(lane) {
  return selectedLane.value === lane
}

</script>

<template lang="pug">
.champions-text-and-select-lane
  .champions-text CHAMPIONS
  .lanes(v-if="order.lanes.length > 0")
    div.lane-background(v-for="lane in order.lanes" )
      img.selected-lane-background(v-show="isLaneSelected(lane)" src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/selected-lane.webp')
      img.lane(:src="`https://storage.googleapis.com/divine-boost-bucket/assets/assets/lanes/${lane}.webp`" @click="changeSelectedLane(lane)")
  div.any-lane-text(v-else) Any Lane
.champions(v-if="heroes.length > 0")
  img.champion(v-for="hero in heroes" :src="`https://storage.googleapis.com/divine-boost-bucket/assets/assets/squares/league-of-legends/${hero}.webp`")
div.any-champion-text(v-else) Any Champion
</template>

<style scoped>
.champions-text-and-select-lane {
  margin: 55px -3rem 46px -3rem;
  padding: 6px 22px 7px 39px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 1px #eee;
}
.champions-text {
  font-size: 32px;
  font-weight: 600;
  color: #222;
}
.any-lane-text,
.any-champion-text{
  font-size: 24px;
  font-weight: 600;
  color: #222;
}
.champions {
  display: flex;
  gap: 1.1rem;
}
.champion {
  width: 74px;
  height: 73.6px;
  border-radius: 50%;
}
.lanes {
  display:flex;
  align-items: center;
}
.lane-background {
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.lane {
  height: 63px;
  width: 63px;
  margin-top: 8px;
  cursor: pointer;

}
.selected-lane-background {
  width: 72px;
  height: 78px;
  margin-bottom: -78px;
}
</style>

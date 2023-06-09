<script setup>
import { lanes } from '@/constants/league-of-legends-constants'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

const lanesUrls = import.meta.glob('../../../assets/lanes/*.png', {
  import: 'default',
  eager: true
})

</script>

<template lang="pug">
.select-lanes
  .background(v-for="lane in lanes" :key="lane" v-bind:class="currentLeagueOfLegendsOrder.isLaneSelected(lane) ? 'selected-background' : ' '")
    v-img.lane(:src='lanesUrls[`../../../assets/lanes/${lane}.png`]' width="3rem" @click="currentLeagueOfLegendsOrder.addOrRemoveLane(lane)")
</template>

<style scoped>
.select-lanes {
  display: flex;
  padding: 1rem 0.3rem;
  justify-content: space-around;
}
.background {
  width: 65.8px;
  height: 65.8px;
  border-radius: 15px;
  background-color: #f4f1f0;
  position: relative;
  cursor: pointer;
}
.lane {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.selected-background {
  box-shadow: 0 0 4px 0 #c8aa6e;
  border: solid 3px #c8aa6e;
}
.background:hover {
  box-shadow: 0 0 4px 0 #c8aa6e;
}
</style>
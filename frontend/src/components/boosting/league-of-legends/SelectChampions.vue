<script setup>
import { ref, computed } from 'vue'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'
import CheckoutSelection from '@/components/CheckoutSelection'

import { champions } from '@/constants/league-of-legends-constants'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()
const dialog = ref(false)

const searchName = ref('')

const selectedLane = ref('')

function addChampions(champion) {
  currentLeagueOfLegendsOrder.addChampion(selectedLane.value, champion)
}

const filteredChampions = computed(() => {
  if (!currentLeagueOfLegendsOrder.lanes.includes(selectedLane.value)) {
    selectedLane.value = currentLeagueOfLegendsOrder.lanes[0]
  }
  if (!selectedLane.value) return []
  return champions[selectedLane.value].filter((champion) => {
    return champion.toLowerCase().includes(searchName.value.toLowerCase())
  })
})

function changeSelectedLane(lane) {
  selectedLane.value = lane
}

function isLaneSelected(lane) {
  return selectedLane.value === lane
}

</script>

<template lang="pug">
CheckoutSelection(toolTipText="You can set your champions which ones you wanted to play by boosters" title="CHAMPIONS")
  img.logo(v-if="!currentLeagueOfLegendsOrder.isAnyChampionSelected()" src='@/assets/icons/plus.png')
  img.logo(v-else src='@/assets/squares/league-of-legends/aatrox.png')
  v-dialog(v-model='dialog' activator='parent' width='auto')
    v-card
      .row
        .title(@click="selamla") SELECT CHAMPIONS
        v-tooltip(location="right" text='You can your champions bla bla bla ' )
          template(v-slot:activator='{ props }')
            img.question-mark(src="@/assets/icons/question-mark.png" v-bind='props')
      .filters
        v-text-field.search(label="Search for booster" v-model="searchName")
        .lanes(v-if="currentLeagueOfLegendsOrder.lanes.length > 0")
          img.lane(v-for="lane in currentLeagueOfLegendsOrder.lanes" :key="lane" :src='`../../src/assets/lanes/${lane}.png`' @click="changeSelectedLane(lane)" v-bind:class="isLaneSelected(lane) ? 'selected-background' : ' '")
        .please-select-lane(v-else) at least please select 1 lane to choose champions
      .champions-background
        .champions
          img.champion(v-for="champion in filteredChampions" :src='`../../src/assets/squares/league-of-legends/${champion}.png`' @click="addChampions(champion)")
      v-divider
      .last-row
        img.selected-lane(v-if="selectedLane != ''" :src='`../../src/assets/lanes/${selectedLane}.png`')
        img.champion(v-for="champion in currentLeagueOfLegendsOrder.champions[selectedLane]" :src='`../../src/assets/squares/league-of-legends/${champion}.png`')
        img.champion(v-if="currentLeagueOfLegendsOrder.champions[selectedLane]?.length < 3 " v-for="index in 3 - currentLeagueOfLegendsOrder.champions[selectedLane]?.length || 0" :src='`../../src/assets/squares/league-of-legends/champion.png`')
        v-btn.price-calculation
          .calculation-text(v-if="currentLeagueOfLegendsOrder.champions[selectedLane]?.length < 3 ") +%10
          .calculation-text(v-if="currentLeagueOfLegendsOrder.champions[selectedLane]?.length >= 3 ") FREE

</template>

<style scoped>
.logo {
  cursor: pointer;
  width: 50px;
}
.lane {
  width: 3rem;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 3rem 1rem 3rem;
}
.v-card {
  width: 900px;
  min-height: 900px;
  max-height: 1700px;
  border-radius: 5px;
  background-color: #fff;
  font-family: Inter;
}
.title {
  font-size: 40px;
  font-weight: bold;
  color: #222;
}
.question-mark {
  height: 3rem;
  width: 3rem;
}
.filters {
  height: 120px;
  background-color: #eee;
  padding: 2rem 2rem 2rem 2rem;
  display: flex;
  justify-content: space-between;
}
.search {
  width: 260px;
  height: 60px;
  flex-grow: 0;
  border-radius: 5px;
  background-color: #fff;
}
.lanes {
  display: flex;
  gap: 2.3rem;
}
.lane {
  cursor: pointer;
}
.selected-background {
  background-color: #472020;
}
.champions-background {
  height: 36rem;
}
.champions {
  height: min-content;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem 2rem;
  gap: 1rem;
}
.champion {
  height: 4rem;
  width: 4rem;
}
.selected-lane {
  width: 4rem;
  height: 4rem;
}
.last-row {
  display: flex;
  gap: 1rem;
  margin: auto 0;
  padding: 0 2rem;
}
.champion-text {
  margin-left: auto;
  font-size: 48px;
  align-self: right;
}
.price-calculation {
  width: 200px;
  height: 60px;
  border-radius: 5px;
  box-shadow: 0 0 4px 1px rgba(5, 255, 0, 0.25);
  background-color: #2E48FC;
  margin-left: auto;
}
.calculation-text {
  font-size: 32px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
}
</style>

<script setup>
import { ref, computed } from 'vue'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'
import CheckoutSelectionColumn from '@/components/CheckoutSelectionColumn'
import { heroes } from '@/constants/league-of-legends-constants'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()
const dialog = ref(false)

const searchName = ref('')

const selectedLane = ref('')

const filteredHeroes = computed(() => {
  if (!currentLeagueOfLegendsOrder.lanes.includes(selectedLane.value)) {
    selectedLane.value = currentLeagueOfLegendsOrder.lanes[0]
  }
  if (!selectedLane.value) return []
  return heroes[selectedLane.value].filter((hero) => {
    return hero.toLowerCase().includes(searchName.value.toLowerCase())
  })
})

function changeSelectedLane(lane) {
  selectedLane.value = lane
}

function isLaneSelected(lane) {
  return selectedLane.value === lane
}

const selectedHeroes = computed(() => {
  console.log(Object.values(currentLeagueOfLegendsOrder.heroes).flat().slice(0, 3))
  console.log('selamlar abi noluyor ?')
  return Object.values(currentLeagueOfLegendsOrder.heroes).flat().slice(0, 3)
})

</script>

<template lang="pug">
CheckoutSelectionColumn(toolTipText="You can set your champions which ones you wanted to play by boosters" title="CHAMPIONS")
  img.logo(v-if="!currentLeagueOfLegendsOrder.isAnyHeroSelected()" src='@/assets/icons/plus.png')
  div(v-else)
    .selected-champions(v-if="selectedHeroes.length > 0")
      img.logo(src='@/assets/icons/plus.png')
      img.selected-champion(v-for="hero in selectedHeroes" :key="hero" :src='`../../src/assets/squares/league-of-legends/${hero}.png`')
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
          img.champion(v-for="hero in filteredHeroes" :src='`../../src/assets/squares/league-of-legends/${hero}.png`' @click="currentLeagueOfLegendsOrder.addHero(selectedLane, hero)")
      v-divider
      .last-row
        img.selected-lane(v-if="selectedLane != ''" :src='`../../src/assets/lanes/${selectedLane}.png`')
        img.champion(v-for="hero in currentLeagueOfLegendsOrder.heroes[selectedLane]" :src='`../../src/assets/squares/league-of-legends/${hero}.png`' @click="currentLeagueOfLegendsOrder.addHero(selectedLane, hero)")
        img.champion(v-if="currentLeagueOfLegendsOrder.heroes[selectedLane]?.length < 3 " v-for="index in 3 - currentLeagueOfLegendsOrder.heroes[selectedLane]?.length || 0" :src='`../../src/assets/squares/league-of-legends/champion.png`')
        v-btn.price-calculation
          .calculation-text(v-if="currentLeagueOfLegendsOrder.heroes[selectedLane]?.length < 3 ") +%10
          .calculation-text(v-if="currentLeagueOfLegendsOrder.heroes[selectedLane]?.length >= 3 ") FREE
</template>

<style scoped>
.selected-champions {
  display: flex;
  cursor: pointer;
}
.selected-champion {
  height: 50px;
  width: 50px;
  margin-left: -22px;
  border: solid 0.5px #000;
  border-radius: 50%;
}
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
  padding: 2rem;
  gap: 0.6rem;
  justify-content: center;
}
.champion {
  height: 4rem;
  width: 4rem;
  border-radius: 45px;
  border: 3px solid #000;
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

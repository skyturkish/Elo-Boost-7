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
  return Object.values(currentLeagueOfLegendsOrder.getHeroes).flat().slice(0, 3)
})

function isSelectedHero(hero) {
  return currentLeagueOfLegendsOrder.getHeroes[selectedLane.value].includes(hero)
}
</script>

<template lang="pug">
CheckoutSelectionColumn(toolTipText="aaaaaaaaaa" title="CHAMPIONS")
  img.logo(v-if="!currentLeagueOfLegendsOrder.isAnyHeroSelected()" src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/plus.webp' alt="plus")
  div(v-else)
    div.row-
      img.logo(src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/plus.webp' alt="plus")
      .selected-champions(v-if="selectedHeroes.length > 0")
        img.selected-champion(v-for="hero in selectedHeroes" :key="hero" :src='`https://storage.googleapis.com/divine-boost-bucket/assets/assets/squares/league-of-legends/${hero}.webp`' :alt="hero")
  v-dialog(v-model='dialog' activator='parent' width='auto')
    v-card
      .row
        div.row--
          .title(@click="selamla") SELECT CHAMPIONS
          v-tooltip(max-width="500px" location="top" text='TO REQUEST AN OTP BOOSTER YOU CAN CHOOSE ONE OR TWO CHAMPIONS FOR EACH ROLE YOU HAVE SELECTED. \n (+%10) \n YOU MUST CHOOSE AT LEAST 3 CHAMPIONS FROM EVERY ROLE DESIRED TO HAVE A FREE CHAMP WISHLIST. \n (FREE)' )
            template(v-slot:activator='{ props }')
              img.question-mark(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/big-question-mark.webp" v-bind='props' alt="question-mark")
        v-icon(icon='mdi-close' @click="dialog = false")
      .filters
        v-text-field.search(variant="underlined" prepend-icon="mdi-magnify" label="Search for champions" v-model="searchName")
        .lanes(v-if="currentLeagueOfLegendsOrder.lanes.length > 0")
          div.lane-background(v-for="lane in currentLeagueOfLegendsOrder.lanes")
            img.lane(:key="lane" :src='`https://storage.googleapis.com/divine-boost-bucket/assets/assets/lanes/${lane}.webp`' @click="changeSelectedLane(lane)"  :alt="lane")
            img.selected-lane-background(v-show="isLaneSelected(lane)" src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/selected-lane.webp' alt="selected-lane")
        .please-select-lane(v-else) Please select desired lanes to see champion lists.
      .champions-background
        .champions
          img.champion(v-for="hero in filteredHeroes" :src='`https://storage.googleapis.com/divine-boost-bucket/assets/assets/squares/league-of-legends/${hero}.webp`' @click="currentLeagueOfLegendsOrder.addHero(selectedLane, hero)" :class="isSelectedHero(hero) ? 'selected-hero' : '' " :alt="hero")
      v-divider
      .last-row
        img.selected-lane(v-if="selectedLane != '' && currentLeagueOfLegendsOrder.lanes.length !== 0" :src='`https://storage.googleapis.com/divine-boost-bucket/assets/assets/lanes/${selectedLane}.webp`' :alt="selectedLane")
        img.champion(v-for="hero in currentLeagueOfLegendsOrder.heroes[selectedLane]" :src='`https://storage.googleapis.com/divine-boost-bucket/assets/assets/squares/league-of-legends/${hero}.webp`' @click="currentLeagueOfLegendsOrder.addHero(selectedLane, hero)" :alt="hero")
        img.champion(v-if="currentLeagueOfLegendsOrder.heroes[selectedLane]?.length < 3 " v-for="index in 3 - currentLeagueOfLegendsOrder.heroes[selectedLane]?.length || 0" :src='`https://storage.googleapis.com/divine-boost-bucket/assets/assets/squares/league-of-legends/champion.webp`' alt="champion")
        v-btn(v-if="currentLeagueOfLegendsOrder.lanes.length !== 0").price-calculation
          .calculation-text(v-if="currentLeagueOfLegendsOrder.heroesPriced") +%10
          .calculation-text(v-else) FREE
</template>

<style scoped>
.row-- {
  display:flex;
  align-items: center;
  gap: 1.5rem;
}
.row- {
  display:flex
}
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
  padding: 2.5rem 3rem 2.5rem 2.5rem;
}
.v-card {
  width: 900px;
  min-height: 900px;
  max-height: 1700px;
  border-radius: 5px;
  background-color: #fff;

}
.title {
  font-size: 40px;
  font-weight: bold;
  color: #222;
}
.question-mark {
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 45px;
  box-shadow: 0px 1px 3px 0px #989898;
}
.filters {
  height: 120px;
  background-color: #eee;
  padding: 2rem 2rem 2rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search {
  width: 260px;
  height: 60px;
  flex-grow: 0;
  border-radius: 5px;
}
.lanes {
  display: flex;
  gap: 2.3rem;
}
.lane {
  cursor: pointer;
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
  padding: 1.5rem;
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
.please-select-lane {
  font-size: 17px;
  color: #ababab;
}

.selected-hero {
  opacity: 0.4;
}
.selected-lane-background {
  width: 73px;
  height: 73px;
  position: absolute;
  transition: .5s ease;
  font-size: 20px;
  margin: -11px 0px 0px -60px;
}

</style>

<script setup>
import { ref, computed } from 'vue'
import { useValorantOrder } from '@/store/valorant-order'
import CheckoutSelectionColumn from '@/components/CheckoutSelectionColumn'
import { heroes } from '@/constants/valorant-constants'

const currentValorantOrder = useValorantOrder()
const dialog = ref(false)
const searchName = ref('')

const filteredHeroes = computed(() => {
    return heroes.filter((hero) => {
        return hero.toLowerCase().includes(searchName.value.toLowerCase())
    })
})

function isSelectedHero(hero) {
  return currentValorantOrder.heroes.includes(hero)
}
</script>

<template lang="pug">
CheckoutSelectionColumn(toolTipText="You can set your agents which ones you wanted to play by boosters" title="AGENTS")
  img.logo(v-if="!currentValorantOrder.isAnyHeroSelected" src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/plus.webp' alt="plus")
  div(v-else)
    div.row-
      img.logo(src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/plus.webp' alt="plus")
      .selected-champions(v-if="currentValorantOrder.heroes.length > 0")
        img.selected-champion(v-for="hero in currentValorantOrder.heroes.slice(0, 3)" :key="hero" :src='`https://storage.googleapis.com/divine-boost-bucket/assets/assets/squares/valorant/${hero}.webp`' :alt="hero")
  v-dialog(v-model='dialog' activator='parent' width='auto')
    v-card
      .row
        div.row--
          .title(@click="selamla") SELECT AGENTS
          v-tooltip(max-width="500px" location="top" text='TO REQUEST AN OTP BOOSTER YOU CAN CHOOSE ONE OR TWO CHAMPIONS FOR EACH ROLE YOU HAVE SELECTED. \n (+%10) \n YOU MUST CHOOSE AT LEAST 3 CHAMPIONS FROM EVERY ROLE DESIRED TO HAVE A FREE CHAMP WISHLIST. \n (FREE)' )
            template(v-slot:activator='{ props }')
              img.question-mark(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/big-question-mark.webp" v-bind='props' alt="question-mark")
        v-icon(icon='mdi-close' @click="dialog = false")
      .filters
        v-text-field.search(label="Search for agents" v-model="searchName")
      .champions-background
        .champions
          img.champion(v-for="hero in filteredHeroes" :src='`https://storage.googleapis.com/divine-boost-bucket/assets/assets/squares/valorant/${hero}.webp`' @click="currentValorantOrder.addHero(hero)" :alt="hero"  :class="isSelectedHero(hero) ? 'selected-hero' : '' ")
      v-divider
      .last-row
        img.champion(v-for="hero in currentValorantOrder.heroes" :src='`https://storage.googleapis.com/divine-boost-bucket/assets/assets/squares/valorant/${hero}.webp`' @click="currentValorantOrder.addHero(hero)" :alt="hero")
</template>

<style scoped>
.selected-hero {
  opacity: 0.4;
}
.row-- {
  display:flex;
  align-items: center;
  gap: 1.5rem;
}
.row- {
  display:flex
}
.logo {
  cursor: pointer;
  width: 50px;
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
}
.search {
  width: 260px;
  height: 60px;
  flex-grow: 0;
  border-radius: 5px;
  background-color: #fff;
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
.last-row {
  display: flex;
  gap: 1rem;
  margin: auto 0;
  padding: 1.5rem;
  height: 100px;
}

</style>

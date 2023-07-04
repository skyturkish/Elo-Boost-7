<script setup>
import { ref, computed } from 'vue'
import { useValorantOrder } from '@/store/valorant-order'
import CheckoutSelection from '@/components/CheckoutSelection'
import { heroes } from '@/constants/valorant-constants'

const currentValorantOrder = useValorantOrder()
const dialog = ref(false)
const searchName = ref('')

const filteredHeroes = computed(() => {
    return heroes.filter((hero) => {
        return hero.toLowerCase().includes(searchName.value.toLowerCase())
    })
})
</script>

<template lang="pug">
CheckoutSelection(toolTipText="You can set your agents which ones you wanted to play by boosters" title="AGENTS")
  img.logo(v-if="!currentValorantOrder.isAnyHeroSelected()" src='@/assets/icons/plus.png')
  img.logo(v-else src='@/assets/squares/valorant/sage.png')
  v-dialog(v-model='dialog' activator='parent' width='auto')
    v-card
      .row
        .title(@click="selamla") SELECT AGENTS
        v-tooltip(location="right" text='You can your agents bla bla bla ' )
          template(v-slot:activator='{ props }')
            img.question-mark(src="@/assets/icons/question-mark.png" v-bind='props')
      .filters
        v-text-field.search(label="Search for agents" v-model="searchName")
      .champions-background
        .champions
          img.champion(v-for="hero in filteredHeroes" :src='`../../../src/assets/squares/valorant/${hero}.png`' @click="currentValorantOrder.addHero(hero)")
      v-divider
      .last-row
        img.champion(v-for="hero in currentValorantOrder.heroes" :src='`../../../src/assets/squares/valorant/${hero}.png`')
</template>

<style scoped>
.logo {
  cursor: pointer;
  width: 50px;
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
.last-row {
  display: flex;
  gap: 1rem;
  margin: auto 0;
  padding: 0 2rem;
}
</style>

<script setup>
import { ref, computed, onMounted } from 'vue'

import CheckoutSelectionColumn from '@/components/CheckoutSelectionColumn'
import Online from '@/components/indicators/Online'
import Offline from '@/components/indicators/Offline'
import DontDistrub from '@/components/indicators/DontDistrub'

import NotAllowed from '@/components/custom-buttons/NotAllowed'
import SelectBoosterButton from '@/components/custom-buttons/SelectBoosterButton'
import BoosterCard from '@/components/cards/BoosterCard'

import { useBoosters } from '@/store/boosters'

import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

const dialog = ref(false)

const searchName = ref('')

const filteredBoosters = computed(() => {
  return useBoosters().boosters.filter((booster) => {
    return booster.mainGame == 'league-of-legends'
  }).filter((booster) => {
    console.log(booster.permissions)
      return booster.permissions.includes('coach')
  }).filter((booster) => {
    return booster.name.toLowerCase().includes(searchName.value.toLowerCase())
  })
})

onMounted(() =>   {
   useBoosters().fetchBoostersIfNotFetched()
})

function setBoosterAndCloseDialog(coach) {
    currentLeagueOfLegendsOrder.coach = coach
    dialog.value = false
}
</script>

<template lang="pug">
CheckoutSelectionColumn(toolTipText="You can choose your favorite coach" title="COACH")
  img.logo(v-if="currentLeagueOfLegendsOrder.coach == null" src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/plus.webp')
  img.logo.booster-photo(v-else :src='currentLeagueOfLegendsOrder.coach.photo')
  v-dialog(v-model='dialog' activator='parent' width='auto')
    v-card
      .row
        .title SELECT COACH
        v-tooltip(location="right" text='You can choose booster you like, under page bla bla bla bla bla' )
          template(v-slot:activator='{ props }')
            img.question-mark(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/question-mark.webp" v-bind='props')
      .filters
        v-text-field.search(label="Search for booster" v-model="searchName")
      .boosters(v-if="filteredBoosters.length > 0")
        BoosterCard(v-for="booster in filteredBoosters" :key="booster")
          .rate
            img.star(src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/star.webp')
            .rate-text {{booster.rate}}
          .profile-and-rank
            .dd
              Online(v-if="booster.onlineState == 'online' ")
              Offline(v-if="booster.onlineState == 'offline' ")
              DontDistrub(v-if="booster.onlineState == 'dont-distrub' ")
              img.profile-photo(cover :src="booster.photo")

            img.rank-image(cover :src='`../../src/assets/ranks/${booster.mainGame}/${booster.maxRank}.webp`')
          .booster-name {{booster.name}}
          .buttons
            SelectBoosterButton(v-if="booster.onlineState != 'dont-distrub' " @click="setBoosterAndCloseDialog(booster)")
            NotAllowed(v-else)
            v-btn.booster-detail-button
              img.icon(src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/menu.webp')
</template>

<style scoped>
.dd {
  display: flex;
  flex-direction: column;
}
.logo {
  cursor: pointer;
  width: 50px;
}
.booster-photo {
  border-radius: 25px;
}
.v-card {
  width: 1000px;
  min-height: 1100px;
  max-height: 1700px;
  border-radius: 5px;
  background-color: #fff;

}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 3rem 1rem 3rem;
}
.title {
  font-size: 64px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #222;
}
.question-mark {
  height: 4rem;
  width: 4rem;
}
.filters {
  height: 120px;
  background-color: #eee;
  padding: 2rem 4rem 2rem 2rem;
  display: flex;
  justify-content: space-between;
}
.search {
  width: 360px;
  height: 60px;
  flex-grow: 0;
  border-radius: 5px;
  background-color: #fff;
}
.selected-background {
  background-color: #472020;
}
.boosters {
  display:flex;
  gap: 2rem;
  flex-wrap: wrap;
  padding: 2rem 0 0 4rem;
  height: 850px;
}
.profile-and-rank {
  display: flex;
  justify-content: space-between;
}
.rank-image {
  width: 90px;
  height: 90px;
}
.profile-photo {
  width: 100px;
  height: 100px;
  border-radius: 7px;
  border: solid 1px #171120;
}
.online-state-button {
  width: 1rem;
  height: 1rem;
  border-radius: 10px;
  margin-left: -8px;
  margin-bottom: -8px;
  z-index: 1;
}
.green {
  box-shadow: 0 0 4px 1px rgba(84, 191, 0, 0.25);
  background-color: #54bf00;
}
.grey {
  box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.25);
  background-color: #888;

}
.red {
  background-color: #54bf00;
  box-shadow: 0 0 4px 1px rgba(255, 0, 0, 0.25);
  background-color: #f00;
}
.star {
  width: 28px;
  height: 28px;
}
.rate {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -1.7rem;
  margin-bottom: 0.2rem;
  align-self: flex-end;
  margin-left: -11rem;
}
.rate-text {
  font-size: 24px;
  font-weight: bold;
  color: #bb9d19;
  padding-top: 2px;
}
.buttons  {
  display:flex;
  justify-content: space-between;
  padding-top: 1.4rem;
}
.select-button {
  width: 140px;
  height: 50px;
  border-radius: 5px;
  box-shadow: 0 0 4px 1px rgba(5, 255, 0, 0.25);
  background-color: #54bf00;
}
.booster-detail-button {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  background-color: #bababa;
}
.booster-name {
  font-size: 38px;
  font-weight: 500;
  text-align: center;
  color: #222;
  padding-top: 1.4rem;
}
.icon {
  width: 2.2rem;
  padding-top: 0.25rem
}
</style>

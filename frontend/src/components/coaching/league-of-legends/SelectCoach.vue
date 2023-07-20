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
import { lanes } from '@/constants/league-of-legends-constants'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

const dialog = ref(false)

const filteredLanes = ref([])

function addOrRemoveLane(lane) {
    if (filteredLanes.value.includes(lane)) {
        filteredLanes.value = filteredLanes.value.filter((l) => l !== lane)
    } else {
        filteredLanes.value.push(lane)
    }
}

function isLaneSelected(lane) {
    return filteredLanes.value.includes(lane)
}
const searchName = ref('')

const filteredBoosters = computed(() => {
  const updatedList = useBoosters().boosters.filter((booster) => {
    return Object.keys(booster.permissions.coach.games).includes('league-of-legends')
  }).filter((booster) => {
    return booster.name.toLowerCase().includes(searchName.value.toLowerCase())
  }).filter((booster) => {
      if (filteredLanes.value.length === 0) return true
      return booster.notifications.booster.games['league-of-legends'].roles.some((lane) => filteredLanes.value.includes(lane))
  })

  return updatedList
})

onMounted(() =>   {
   useBoosters().fetchBoostersIfNotFetched()
})


function setBoosterAndCloseDialog(booster) {
    currentLeagueOfLegendsOrder.coach = booster
    dialog.value = false
}

function setBoosterNullAndCloseDialog() {
    currentLeagueOfLegendsOrder.coach = null
    dialog.value = false
}
function makeRankPath(rank) {
  return rank.split('-')[0]
}
</script>

<template lang="pug">
CheckoutSelectionColumn(toolTipText="You can choose your favorite coach" title="COACH")
  img.logo(v-if="currentLeagueOfLegendsOrder.coach == null" src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/plus.webp' alt="plus")
  img.logo.booster-photo(v-else :src='currentLeagueOfLegendsOrder.coach.photo' :alt="currentLeagueOfLegendsOrder.coach.name")
  v-dialog(v-model='dialog' activator='parent' width='auto')
    v-card
      .row
        div.row--
          .title(@click="selamla") SELECT COACH
          v-tooltip(max-width="500px" location="top" text='TO REQUEST AN OTP BOOSTER YOU CAN CHOOSE ONE OR TWO CHAMPIONS FOR EACH ROLE YOU HAVE SELECTED. \n (+%10) \n YOU MUST CHOOSE AT LEAST 3 CHAMPIONS FROM EVERY ROLE DESIRED TO HAVE A FREE CHAMP WISHLIST. \n (FREE)' )
            template(v-slot:activator='{ props }')
              img.question-mark(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/big-question-mark.webp" v-bind='props' alt="question-mark")
        v-btn.remove-booster(v-if="currentLeagueOfLegendsOrder.coach != null" @click="setBoosterNullAndCloseDialog") REMOVE COACH
        v-icon(icon='mdi-close' @click="dialog = false")
      .filters
        v-text-field.search(variant="underlined" prepend-icon="mdi-magnify" label="Search for coachs" v-model="searchName")
        .lanes
          div.lane-background(v-for="lane in lanes")
            img.lane(:key="lane" :src='`https://storage.googleapis.com/divine-boost-bucket/assets/assets/lanes/${lane}.webp`' @click="addOrRemoveLane(lane)"  :alt="lane")
            img.selected-lane-background(v-show="isLaneSelected(lane)" src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/selected-lane.webp' alt="selected-lane" @click="addOrRemoveLane(lane)")
      .boosters(v-if="filteredBoosters.length > 0")
        BoosterCard(v-for="booster in filteredBoosters" :key="booster")
          .content
            .rate
              img.star(src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/star.webp' alt="star")
              .rate-text {{booster.rate}}
            .profile-and-rank
              .dd
                Online(v-if="booster.onlineState == 'online' ")
                Offline(v-if="booster.onlineState == 'offline' ")
                DontDistrub(v-if="booster.onlineState == 'dont-distrub' ")
                img.profile-photo(:src="booster.photo" :alt="booster.name")
              img.rank-image(:src='`https://storage.googleapis.com/divine-boost-bucket/assets/assets/ranks/league-of-legends/${makeRankPath(booster.permissions.booster.games[`league-of-legends`].maxRank)}.webp`' alt="rank")
            .booster-name {{booster.name}}
            .booster-lanes
              img.booster-lane(v-for="lane in booster.notifications.booster.games['league-of-legends'].roles" :key="lane" :src='`https://storage.googleapis.com/divine-boost-bucket/assets/assets/lanes/${lane}.webp`' :alt="lane")
          v-btn.select-booster-button(v-if="booster.onlineState != 'dont-distrub' " @click="setBoosterAndCloseDialog(booster)")
            img.icon(src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/checkmark.webp' alt="checkmark")
          //- SelectBoosterButton(v-if="booster.onlineState != 'dont-distrub' " @click="setBoosterAndCloseDialog(booster)")
          v-btn.dont-allow-select-booster-button(v-else disabled=true)
            img.cancel(src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/cancel.webp' alt="checkmark")
  </template>

  <style scoped>
  .content {
    padding: 0rem 1.5rem 1rem 1.5rem;
    box-shadow:  0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
  .cancel {
    height: 25px;
    width: 25px;
  }
  .icon {
    height: 21px;
    width: 28px;
  }
  .row-- {
    display:flex;
    align-items: center;
    gap: 1.5rem;
  }
  .selected-lane-background {
    width: 73px;
    height: 73px;
    position: absolute;
    transition: .5s ease;
    font-size: 20px;
    margin: -11px 0px 0px -60px;
    cursor: pointer;
  }

  .lanes {
    display: flex;
    gap: 2.3rem;
  }
  .lane {
    cursor: pointer;
  }
  .lane {
    width: 3rem;
  }
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
    width: 900px;
    min-height: 900px;
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
    padding: 2rem 4rem 2rem 2rem;
    display: flex;
    justify-content: space-between;
  }
  .search {
    width: 260px;
    height: 60px;
    flex-grow: 0;
    border-radius: 5px;
  }
  .lanes {
    display: flex;
    gap: 3rem;
  }
  .lane {
    cursor: pointer;
  }
  .selected-background {
    background-color: #472020;
  }
  .boosters {
    display:flex;
    gap: 2rem;
    flex-wrap: wrap;
    padding: 1.3rem;
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
  }
  .rate {
    display: flex;
    align-items: center;
    margin-top: -1.7rem;
    justify-content: end;

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
  .booster-lanes {
    padding-top: 0.5rem;
    height: 50px;
    display:flex;
    justify-content: center;
  }
  .booster-lane {
    height: 50px;
  }
  .select-booster-button {
    height: 50px;
    border-radius: 0px 0px 17px 17px;
    background: #54BF00;
    box-shadow: 0px 0px 4px 1px rgba(5, 255, 0, 0.25);
    margin-bottom: -1.7rem;
  }
  .dont-allow-select-booster-button {
    height: 50px;
    border-radius: 0px 0px 17px 17px;
    background: #3E3E3E;
    box-shadow: 0px 0px 4px 1px rgba(66, 70, 66, 0.25);
    margin-bottom: -1.7rem;
  }
  .remove-booster {
    box-shadow: 0px 0px 4px 1px rgba(168, 73, 91, 0.25);
    border-radius: 17px;
    background-color: rgb(240, 74, 74);
  }
  </style>

<script setup>
import { ref } from 'vue'
// TODO can make more dynamic
import leagueOfLegendsIcon from '../assets/icons/League_of_Legends_icon.png'
import valorantIcon from '../assets/icons/Valorant_icon.png'
import teamfightTacticsIcon from '../assets/icons/Teamfight_tactics_icon.png'
import wildRiftIcon from '../assets/icons/Wild_Rift_icon.png'

import LeagueOfLegendsOrder from '@/components/order/leagueOfLegends/LeagueOfLegends.vue'
import ValorantOrder from '@/components/order/valorant/Valorant.vue'


let tab = ref(null)
  
</script>

<template>
    <v-responsive class="d-flex align-center text-center fill-height">
    <v-tabs
      v-model="tab"
      color="deep-purple-accent-4"
      align-tabs=center
      bg-color= grey
    >
      <v-tab :value="1">
        <img :src=leagueOfLegendsIcon alt="League Of Legends" height="24">
        LOL</v-tab>
      <v-tab :value="2">
        <img :src=valorantIcon alt="Valorant" height="24">
        Valorant</v-tab>
      <v-tab :value="3">
        <img :src=teamfightTacticsIcon alt="Teamfight Tactics" height="24">
        TFT</v-tab>
      <v-tab :value="4">
        <img :src=wildRiftIcon alt="Wild Rift" height="24">
        Wild Rift</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item
        v-for="n in 4"
        :key="n"
        :value="n"
      >
      <div v-if="n == '1'">
        <LeagueOfLegendsOrder />
      </div>
      <div v-else-if="n == '2'">
        <ValorantOrder />
      </div>
      <div v-else-if="n == '3'">
        <LeagueOfLegendsOrder />
      </div>
      <div v-else-if="n == '4'">
        <LeagueOfLegendsOrder />
      </div>

      </v-window-item>
    </v-window>
    </v-responsive>
</template>

<style scoped>



</style>


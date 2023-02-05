<script setup>
import { ref } from 'vue'
// TODO can make more dynamic

import iron from '@/assets/divisions/leagueOfLegends/Season_2022_Iron.png'
import bronze from '@/assets/divisions/leagueOfLegends/Season_2022_Bronze.png'
import silver from '@/assets/divisions/leagueOfLegends/Season_2022_Silver.png'
import gold from '@/assets/divisions/leagueOfLegends/Season_2022_Gold.png'
import platinum from '@/assets/divisions/leagueOfLegends/Season_2022_Platinum.png'
import diamond from '@/assets/divisions/leagueOfLegends/Season_2022_Diamond.png'
import master from '@/assets/divisions/leagueOfLegends/Season_2022_Master.png'
import grandMaster from '@/assets/divisions/leagueOfLegends/Season_2022_GrandMaster.png'
import challenger from '@/assets/divisions/leagueOfLegends/Season_2022_Challenger.png'

const path = '../assets/divisions/leagueOfLegends/'

const divisions = [iron,bronze,silver,gold,platinum,diamond,master,grandMaster,challenger]

  
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
        <div>League Of legends Placements</div>
    </v-responsive>
  </v-container>
</template>

<style scoped>

</style>


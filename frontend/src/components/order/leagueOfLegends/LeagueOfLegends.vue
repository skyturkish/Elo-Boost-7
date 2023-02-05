<script setup>
import { ref } from 'vue'

import DivisionOrder from '@/components/order/leagueOfLegends/boostType/Divisions.vue'
import WinsOrder from '@/components/order/leagueOfLegends/boostType/Wins.vue'
import PlacementsOrder from '@/components/order/leagueOfLegends/boostType/Placements.vue'
import ChampionMasteryOrder from '@/components/order/leagueOfLegends/boostType/ChampionMastery.vue'
import NormalsOrder from '@/components/order/leagueOfLegends/boostType/Normals.vue'
import LevelingOrder from '@/components/order/leagueOfLegends/boostType/Leveling.vue'

const boostTypes = ref({
    Divisions: DivisionOrder,
    Wins:WinsOrder,
    Placements:PlacementsOrder,
    ChampionMastery:ChampionMasteryOrder,
    Normals:NormalsOrder,
    Leveling:LevelingOrder
})

let tab = ref(null)

</script>

<template>
    <div class="">
        <v-card>
          <v-tabs
          v-model="tab"
          align-tabs="center"
          color="deep-purple-accent-4"
        >
        <v-tab
        v-for="boostType, boostTypeName in boostTypes" :key="boostTypeName"
        :value="boostTypeName"
        >
        {{boostTypeName}}
      </v-tab>
    </v-tabs>
    <v-window v-model="tab">

    <v-window-item
        v-for="boostType, boostTypeName in boostTypes"
        :key="boostTypeName"
        :value="boostTypeName"
      >
      <div v-if="boostTypeName == 'Divisions'">
        <DivisionOrder />
      </div>
      <div v-else-if="boostTypeName == 'Wins'">
        <WinsOrder />
      </div>
      <div v-else-if="boostTypeName == 'Placements'">
        <PlacementsOrder />
      </div>
      <div v-else-if="boostTypeName == 'ChampionMastery'">
        <ChampionMasteryOrder />
      </div>
      <div v-else-if="boostTypeName == 'Normals'">
        <NormalsOrder />
      </div>
      <div v-else-if="boostTypeName == 'Leveling'">
        <LevelingOrder />
      </div>
      </v-window-item>
    </v-window>
  </v-card>
    </div>
</template>

<style scoped>

</style>


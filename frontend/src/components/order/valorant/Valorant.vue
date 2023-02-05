<script setup>
import { ref } from 'vue'

import DivisionOrder from '@/components/order/valorant/boostType/Divisions.vue'
import WinsOrder from '@/components/order/valorant/boostType/Wins.vue'
import PlacementsOrder from '@/components/order/valorant/boostType/Placements.vue'
import UnratedOrder from '@/components/order/valorant/boostType/Unrated.vue'

const boostTypes = ref({
    Divisions: DivisionOrder,
    Wins:WinsOrder,
    Placements:PlacementsOrder,
    Unrated:UnratedOrder,
})

let tab = ref(null)

</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
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
      <div v-else-if="boostTypeName == 'Unrated'">
        <UnratedOrder />
      </div>
      </v-window-item>
    </v-window>
  </v-card>
    </v-responsive>
  </v-container>
</template>

<style scoped>

</style>


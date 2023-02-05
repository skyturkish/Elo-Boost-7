<script setup>
import { ref } from 'vue'

import { useCurrentOrder } from '@/store/currentOrder'

const CurrentOrderStore = useCurrentOrder()

const divisionMileStones= [ 'I', 'II' ,'III', 'IV']

</script>

<template>
    <div class="divisionMileStones">
        <v-btn 
        v-for="milestone in divisionMileStones" 
        :key="milestone" 
        variant="tonal" 
        @click="CurrentOrderStore.changeMileStone(milestone)">{{ milestone }}</v-btn>
    </div>
</template>

<style scoped>
.divisionMileStones {
  display: flex;
  gap: 1rem;
}
</style>


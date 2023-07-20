<script setup>
import { ref } from 'vue'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()


const kk = ref('')

</script>

<template lang="pug">
v-select(:items="['1 GAMES','2 GAMES','3 GAMES','4 GAMES','5 GAMES']" v-model="currentLeagueOfLegendsOrder.amountWinGame" variant="outlined")
  template(v-slot:selection='{ item, index }')
    h5(:style="{color: currentLeagueOfLegendsOrder.colors.dominantColor}") {{ item.title }}
</template>

<style scoped>
.aa {
  width: 100px;
  height: 50px;
}
.border {
  height: 45px;
  width: 217px;
  border-radius: 10px;
  display: flex;
}
.game-amount {
  font-size: 13px;
  font-weight: 600;
}
</style>
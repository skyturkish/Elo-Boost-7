<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()
</script>

<template lang="pug">
v-select.rounded-select(id="mySelect" v-model="currentLeagueOfLegendsOrder.currentLP" :items="[' 0-20LP','20-40LP','40-60LP','60-80LP','80-100LP']" variant="outlined" )
  template(v-slot:selection='{ item, index }')
    h5(:style="{color: currentLeagueOfLegendsOrder.colors.dominantColor}") {{ item.title }}
  //- template(v-slot:label='{ label, props }')
  //-   h4(:style="{color: currentLeagueOfLegendsOrder.colors.dominantColor}") {{ label }}
</template>

<style >
h5 {
  display:flex;
  justify-content: center;
  align-items: center;
}
.v-input__control {
  border-radius:50px;
}

</style>
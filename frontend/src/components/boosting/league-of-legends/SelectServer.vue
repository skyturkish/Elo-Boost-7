<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()
</script>

<template lang="pug">
v-select(:items="['EUW','EUNE','NA','RU','TR']" v-model="currentLeagueOfLegendsOrder.server" variant="outlined" rounded="true")
  //- template(v-slot:item='{ props, item, index }')
  //-   h6 {{ index }}
  //- template(v-slot:selection='{ item, index }')
  //-   h6.ddd {{ item.title }}
</template>

<style scoped>

</style>

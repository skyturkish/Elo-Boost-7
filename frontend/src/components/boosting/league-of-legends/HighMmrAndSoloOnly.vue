<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'
import CheckoutSelection from '@/components/CheckoutSelection'
import CustomSwitch from '@/components/CustomSwitch'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

</script>

<template lang="pug">
CheckoutSelection(v-if="currentLeagueOfLegendsOrder.isDuo" toolTipText="High MMR go brrrr" title="HIGH MMR")
  CustomSwitch(v-model="currentLeagueOfLegendsOrder.highMMR")
CheckoutSelection(v-else toolTipText="sadece solo oyna lütfen" title="SOLO ONLY")
  CustomSwitch(v-model="currentLeagueOfLegendsOrder.soloOnly")
</template>

<style scoped>
.logo {
  width: 50px;
}
</style>

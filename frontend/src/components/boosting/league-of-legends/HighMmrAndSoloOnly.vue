<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'
import CheckoutSelection from '@/components/CheckoutSelection'
import CustomSwitch from '@/components/CustomSwitch'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

</script>

<template lang="pug">
CheckoutSelection(v-if="currentLeagueOfLegendsOrder.isDuo" toolTipText="High MMR go brrrr" title="HIGH MMR")
  img.logo(src='@/assets/icons/high-mmr.png')
  CustomSwitch(v-model="currentLeagueOfLegendsOrder.highMMR")
CheckoutSelection(v-else toolTipText="sadece solo oyna lütfen" title="SOLO ONLY")
  img.logo(src='@/assets/icons/solo.png')
  CustomSwitch(v-model="currentLeagueOfLegendsOrder.soloOnly")
</template>

<style scoped>
.logo {
  width: 50px;
}
</style>

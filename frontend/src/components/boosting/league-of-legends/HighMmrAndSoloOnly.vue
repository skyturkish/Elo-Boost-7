<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'
import CheckoutSelection from '@/components/CheckoutSelection'
import CustomSwitch from '@/components/CustomSwitch'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

</script>

<template lang="pug">
CheckoutSelection(v-if="currentLeagueOfLegendsOrder.isSolo" toolTipText="High MMR go brrrr" title="HIGH MMR")
  v-img.logo(src='@/assets/icons/high-mmr.png' width="50px")
  CustomSwitch(v-model="currentLeagueOfLegendsOrder.highMMR")
CheckoutSelection(v-else toolTipText="sadece solo oyna lütfen" title="SOLO ONLY")
  v-img.logo(src='@/assets/icons/solo.png' width="50px")
  CustomSwitch(v-model="currentLeagueOfLegendsOrder.soloOnly")
</template>

<style scoped>

</style>

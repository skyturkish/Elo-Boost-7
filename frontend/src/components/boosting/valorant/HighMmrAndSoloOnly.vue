<script setup>
import { useValorantOrder } from '@/store/valorant-order'
import CheckoutSelection from '@/components/CheckoutSelection'
import CustomSwitch from '@/components/CustomSwitch'

const currentValorantOrder = useValorantOrder()

</script>

<template lang="pug">
CheckoutSelection(v-if="currentValorantOrder.isSolo" toolTipText="High MMR go brrrr" title="HIGH MMR")
  v-img.logo(src='@/assets/icons/high-mmr.png' width="50px")
  CustomSwitch(v-model="useValorantOrder.highMMR")
CheckoutSelection(v-else toolTipText="sadece solo oyna lütfen" title="SOLO ONLY")
  v-img.logo(src='@/assets/icons/solo.png' width="50px")
  CustomSwitch(v-model="useValorantOrder.soloOnly")
</template>

<style scoped>

</style>

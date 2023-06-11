<script setup>
import { useValorantOrder } from '@/store/valorant-order'
import CheckoutSelection from '@/components/CheckoutSelection'
import CustomSwitch from '@/components/CustomSwitch'

const currentValorantOrder = useValorantOrder()

</script>

<template lang="pug">
CheckoutSelection(toolTipText="bunu seçerseniz aimimizin daha iyi bir booster veriyoruz, ve toxic falan da olmuyor ha, keke anladın" title="Premium")
  v-img.logo(src='@/assets/icons/bonus-win.png' width="50px")
  CustomSwitch(v-model="currentValorantOrder.premium")
</template>

<style scoped>

</style>

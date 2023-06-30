<script setup>
import { useValorantOrder } from '@/store/valorant-order'
import CheckoutSelection from '@/components/CheckoutSelection'
import CustomSwitch from '@/components/CustomSwitch'

const currentValorantOrder = useValorantOrder()

</script>

<template lang="pug">
CheckoutSelection(toolTipText="bunu seçerseniz aimimizin daha iyi bir booster veriyoruz, ve toxic falan da olmuyor ha, keke anladın" title="Premium")
  img.logo(src='@/assets/icons/premium.png')
  CustomSwitch(v-model="currentValorantOrder.premium")
</template>

<style scoped>

.logo {
  width: 50px;
}
</style>

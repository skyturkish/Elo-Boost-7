<script setup>
import { useValorantOrder } from '@/store/valorant-order'
import CheckoutSelection from '@/components/CheckoutSelection'
import CustomSwitch from '@/components/CustomSwitch'

const currentValorantOrder = useValorantOrder()

</script>

<template lang="pug">
CheckoutSelection(v-if="currentValorantOrder.isDuo" toolTipText="High MMR go brrrr" title="HIGH MMR")
  CustomSwitch(v-model="useValorantOrder.highMMR")
CheckoutSelection(v-else toolTipText="sadece solo oyna lütfen" title="SOLO ONLY")
  CustomSwitch(v-model="useValorantOrder.soloOnly")
</template>

<style scoped>

.logo {
  width: 50px;
}

</style>

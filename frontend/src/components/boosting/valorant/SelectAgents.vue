<script setup>
import { useValorantOrder } from '@/store/valorant-order'
import CheckoutSelection from '@/components/CheckoutSelection'
import CustomSwitch from '@/components/CustomSwitch'

const currentValorantOrder = useValorantOrder()

</script>

<template lang="pug">
CheckoutSelection(toolTipText="Agenları seçebilirisin" title="AGENTS")
  v-img.logo(v-if="currentValorantOrder.agents.length == 0" src='@/assets/icons/plus.png' width="50px")
</template>

<style scoped>

</style>

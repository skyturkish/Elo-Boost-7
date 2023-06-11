<script setup>
import { useValorantOrder } from '@/store/valorant-order'
import CheckoutSelection from '@/components/CheckoutSelection'
import CustomSwitch from '@/components/CustomSwitch'

const currentValorantOrder = useValorantOrder()

</script>

<template lang="pug">
CheckoutSelection(toolTipText="Bonus wini seçersen var ya ..... neler neler oluyor, aramızda kalsın ama ... KAZANIYORUZZZ" title="BONUS WIN")
  v-img.logo(src='@/assets/icons/bonus-win.png' width="50px")
  CustomSwitch(v-model="currentValorantOrder.bonusWin")
</template>

<style scoped>

</style>

<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'
import CheckoutSelection from '@/components/CheckoutSelection'
import CustomSwitch from '@/components/CustomSwitch'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

</script>

<template lang="pug">
CheckoutSelection(toolTipText="Bonus wini seçersen var ya ..... neler neler oluyor, aramızda kalsın ama ... KAZANIYORUZZZ" title="BONUS WIN")
  v-img.logo(src='@/assets/icons/bonus-win.png' width="50px")
  CustomSwitch(v-model="currentLeagueOfLegendsOrder.bonusWin")
</template>

<style scoped>

</style>

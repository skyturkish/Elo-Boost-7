<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'
import CheckoutSelection from '@/components/CheckoutSelection'
import CustomSwitch from '@/components/CustomSwitch'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

</script>

<template lang="pug">
CheckoutSelection(toolTipText="premium işte abartmaya gerek yok" title="PREMIUM")
  img.logo(src='@/assets/icons/premium.png')
  CustomSwitch(v-model="currentLeagueOfLegendsOrder.premium")
</template>

<style scoped>
.logo {
  width: 50px;
}
</style>

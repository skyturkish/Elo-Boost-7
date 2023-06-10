<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'
import CheckoutSelection from '@/components/CheckoutSelection'
import CustomSwitch from '@/components/CustomSwitch'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

</script>

<template lang="pug">
CheckoutSelection(toolTipText="S tier alacakki kutu falan ala, keke anladın ?" title="S TIER")
  v-img.logo(src='@/assets/icons/s-tier.png' width="50px")
  CustomSwitch(v-model="currentLeagueOfLegendsOrder.stier")
</template>

<style scoped>

</style>

<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'
import CheckoutSelection from '@/components/CheckoutSelection'
import CustomSwitch from '@/components/CustomSwitch'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()

</script>

<template lang="pug">
CheckoutSelection(toolTipText="S tier alacakki kutu falan ala, keke anladın ?" title="S TIER")
  CustomSwitch(v-model="currentLeagueOfLegendsOrder.stier")
</template>

<style scoped>
.logo {
  width: 50px;
}

</style>

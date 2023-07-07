<script setup>
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'
import CheckoutSelection from '@/components/CheckoutSelection'
import CustomSwitch from '@/components/CustomSwitch'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()
</script>

<template lang="pug">
CheckoutSelection(v-if="currentLeagueOfLegendsOrder.isDuo" toolTipText="Untracable imiş ne demek olduğuu bilmiyorum ama buraya koymuşsak iyidir işte alıver" title="UNTRACKABLE")
  img.logo(src='@/assets/icons/untrackable.png')
  CustomSwitch(v-model="currentLeagueOfLegendsOrder.untrackable")
CheckoutSelection(v-else toolTipText="Canlı yayın izlemek istiyorsan hadi twitche abicim, efendilik arama burada" title="STREAM")
  img.logo(src='@/assets/icons/STREAM.png')
  CustomSwitch(v-model="currentLeagueOfLegendsOrder.stream")
</template>

<style scoped>
.logo {
  width: 50px;
}
</style>

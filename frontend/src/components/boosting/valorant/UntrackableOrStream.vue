<script setup>
import { useValorantOrder } from '@/store/valorant-order'
import CheckoutSelection from '@/components/CheckoutSelection'
import CustomSwitch from '@/components/CustomSwitch'

const currentValorantOrder = useValorantOrder()

</script>

<template lang="pug">
CheckoutSelection(v-if="currentValorantOrder.isDuo" toolTipText="Untracable imiş ne demek olduğuu bilmiyorum ama buraya koymuşsak iyidir işte alıver" title="UNTRACKABLE")
  CustomSwitch(v-model="currentValorantOrder.untrackable")
CheckoutSelection(v-else toolTipText="Canlı yayın izlemek istiyorsan hadi twitche abicim, efendilik arama burada" title="STREAM")
  CustomSwitch(v-model="currentValorantOrder.stream")
</template>

<style scoped>

.logo {
  width: 50px;
}

</style>

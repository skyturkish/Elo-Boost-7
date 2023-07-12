<script setup>
import { useValorantOrder } from '@/store/valorant-order'
import CheckoutSelection from '@/components/CheckoutSelection'
import CustomSwitch from '@/components/CustomSwitch'

const currentValorantOrder = useValorantOrder()

</script>

<template lang="pug">
CheckoutSelection(toolTipText="Bonus wini seçersen var ya ..... neler neler oluyor, aramızda kalsın ama ... KAZANIYORUZZZ" title="BONUS WIN")
  img.logo(src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/bonus-win.webp' alt="bonus-win")
  CustomSwitch(v-model="currentValorantOrder.bonusWin")
</template>

<style scoped>
.logo {
  width: 50px;
}
</style>

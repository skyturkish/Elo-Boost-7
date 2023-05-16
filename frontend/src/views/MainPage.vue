<script setup>
import Banner from '@/components/Banner'

import Games from '@/components/main/Games'
import OurFeatures from '@/components/main/OurFeatures'
import Boosting from '@/components/main/Boosting'
import Coaching from '@/components/main/Coaching'
import Shop from '@/components/main/Shop'
import Hub from '@/components/main/Hub'

import PurchaseEloBoostingButton from '@/components/main/appbar-components/PurchaseEloBoostingButton'
import LearnMoreButton from '@/components/main/appbar-components/LearnMoreButton'
</script>

<template lang="pug">
Banner(splashArtPath = 'main' title = 'WE ARE THE ONES MAKING IT REAL' subtitle = 'We provide you everything that you need all in one place')
  .buttons
    PurchaseEloBoostingButton()
    LearnMoreButton()
Games()
OurFeatures()
Boosting()
Coaching()
Shop()
Hub()
</template>

<style scoped>
.buttons {
  display: flex;
  gap: 1rem;;
}
</style>

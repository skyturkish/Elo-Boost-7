<script setup>

import Logo from '@/components/main/appbar-components/Logo'
import LoginButton from '@/components/main/appbar-components/LoginButton'
import SettingsButton from '@/components/main/appbar-components/SettingsButton'
import PurchaseEloBoostingButton from '@/components/main/appbar-components/PurchaseEloBoostingButton'
import LearnMoreButton from '@/components/main/appbar-components/LearnMoreButton'

</script>

<template lang="pug">
v-img.body(
    aspect-ratio='16/9'
    cover=''
    src='../../assets/games/leagueOfLegends/main_splash.png')
    .firstRow
        Logo()
        .buttons
            LoginButton()
            SettingsButton()
    .trust-pilot ** TRUST PILOT 5 STAR REVIEW **
    .appbar-title WE ARE THE ONES MAKING IT REAL
    .appbar-subtitle we provide you everything that you need all in one place
    .buttons
        PurchaseEloBoostingButton()
        LearnMoreButton()
</template>

<style scoped>
.body {
    padding: 3.2rem;
    display: flex;
    font-family: Inter;
}
.firstRow {
    display: flex;
    justify-content: space-between;
}
.trust-pilot {
    text-shadow: 4px 4px 0 rgba(0, 0, 0, 0.5);
    font-size: 24px;
    font-weight: bold;
    color: #fff;
}
.appbar-title {
    text-shadow: 4px 4px 0 rgba(0, 0, 0, 0.5);
    font-size: 48px;
    font-weight: bold;
    color: #fff;
}

.appbar-subtitle {
    text-shadow: 4px 4px 0 rgba(0, 0, 0, 0.5);
    font-size: 32px;
    font-weight: 500;
    color: #fff;
}
.buttons {
    display: flex;
}
</style>
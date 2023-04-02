<script setup>

import SelectServiceButton from '@/components/main/ourFeatures-components/SelectServiceButton'
import FastVPNSecure from '@/components/main/ourFeatures-components/FastVPNSecureButton'
import CompletePayment from '@/components/main/ourFeatures-components/CompletePaymentButton'
import BoostRank from '@/components/main/ourFeatures-components/BoostRankButton'


const properties = [
    "24/7 Customer Support",
    "Appear Offline & VPN Encryption",
    "Track your Order",
    "Chat with your booster"
]

</script>

<template lang="pug">
.body
    .main-rows
        .informations
            .our-features Our Features
            .it-has-never-been IT HAS NEVER BEEN EASIER <br> WITH YOUR FAVORITE GAMES!
            .fast-safe Fast, safe, entertaining, professional
            .rows
                .properties
                    li.property(v-for='property in properties') {{ property }}
                v-img.yasuo(
                aspect-ratio='16/9'
                cover=''
                src='../../assets/games/leagueOfLegends/yasuo.png')
        .buttons
            SelectServiceButton.select()
            FastVPNSecure.fast()
            CompletePayment.complete()
            BoostRank.boost()


</template>

<style scoped>
.body {
    font-family: Inter;
    padding: 2.5rem;
    height: 800px;
    line-height: normal;
}
.rows {
    display: flex;
}
.main-rows {
    display: flex;
    width: 100%;
}
.our-features {
    font-size: 24px;
    font-weight: bold;
    color: #0047ff;
}
.it-has-never-been {
    font-size: 40px;
    font-weight: bold;
    color: #000;
}
.fast-safe {
    font-size: 20px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.75);
}
.properties {
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.5);
}
.select {
    grid-area: select;
}
.fast {
    grid-area: fast;
}
.complete {
    grid-area: complete;
}
.boost {
    grid-area: boost;
}
.buttons {
    padding-left: 1%;
    width: 65%;
    display:grid;
    grid-template-areas:
   '. . . .'
   'select . . complete'
   'fast . . boost'
   '. . . .';
}
</style>

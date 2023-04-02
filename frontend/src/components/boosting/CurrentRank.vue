<script setup>
import SelectCurrentLP from '@/components/boosting/SelectCurrentLP'
import SelectLPGain from '@/components/boosting/SelectLPGain'
import SelectServer from '@/components/boosting/SelectServer'

import divisions from '@/constants/leagueOfLegendsDivisions'
import divisionMileStones from '@/constants/leagueOfLegendsDivisionMileStones'

import { useCurrentOrder } from '@/store/currentOrder'

const CurrentOrderStore = useCurrentOrder()

const imgUrls = import.meta.glob('../../assets/games/leagueOfLegends/divisions/*.png', {
  import: 'default',
  eager: true
})

</script>

<template lang="pug">
.current-rank
    .title CURRENT RANK
    .divisions
        v-btn.division(
            v-for='division in divisions'
            :key='division.name'
            @click="CurrentOrderStore.division = division.name"
            )
            v-img.division(
                :src='imgUrls[`../../assets/games/leagueOfLegends/divisions/${division.name}.png`]'
                :alt='division.name'
                )
    .mileStones
        v-btn.mileStone(
            v-for='milestone in divisionMileStones'
            :key='milestone'
            variant='tonal'
            @click="CurrentOrderStore.mileStone = milestone"
            ) {{ milestone }}
    .selections
        SelectCurrentLP()
        SelectLPGain()
        SelectServer()
</template>

<style scoped>
.body {
    font-family: Inter;
}
.appBar {
    padding: 3.2rem;
    display: flex;
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
.selectBoost {
    width: 13rem;
    color: #974444;
}
.make-order {
    padding: 4rem;
    display: grid;
    width: 100%;
    height: 800px;
    background-color: rgba(239, 235, 234, 0.69);
    grid-template-columns: repeat(13,1fr);
    grid-gap: 3rem;
    grid-template-rows: repeat(2,1fr);
    grid-template-areas:
    "currentRank currentRank currentRank currentRank currentRank currentRank currentRank currentRank checkout checkout checkout checkout checkout"
    "desiredRank desiredRank desiredRank desiredRank desiredRank desiredRank desiredRank desiredRank checkout checkout checkout checkout checkout";
}
.current-rank {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 15px;
    box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);
    background-color: #fff;
    grid-area: currentRank;
    padding: 2.5rem;
}
.desired-rank{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 15px;
    box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);
    background-color: #fff;
    grid-area: desiredRank;
    padding: 2.5rem;
}
.title {
  font-size: 36px;
  font-weight: 900;
  line-height: normal;
  color: #000;
}

.divisions {
    display: flex;
    gap: 1rem;
}
.division {
    width: 4rem;
    height: 4rem;
    border-radius: 15px;
    background-color: #d9d9d9;
}

.mileStones {
    display: flex;
    gap: 0.75rem;
}
.mileStone {
    width: 45px;
    height: 45px;
    border-radius: 6px;
    background-color: #d9d9d9;
    font-weight: 900;
}
.selections {
    display: flex;
    gap: 1rem;
}
.checkout {
    border-radius: 15px;
    box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);
    background-color: #fff;
    grid-area: checkout;
    display:flex;
    flex-direction: column;
}
.polygon {
    width: 1rem;
}
.fromTo {
    height: 136px;
    background-color: #e4e4e4;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.checkout-division {
    width: 18%;
}
.options {
    width: 100%;
}
.option {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.text {
  font-size: 20px;
  font-weight: bold;
  color: #000;
}

.questionMark {
    width: 1rem;
}
.total-price {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.total {
    font-size: 24px;
    font-weight: 900;
    color: #000;
}

.price {
  font-size: 40px;
  font-weight: bold;
  color: #000;
}
</style>

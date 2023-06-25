<script setup>
import axios from 'axios'
import { ref ,computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { findDominantColorByDivisionName } from '@/constants/league-of-legends-constants'
import { useAccount } from '@/store/account'
import { useOrders } from '@/store/orders'

const useAccountStore = useAccount()
const useOrdersStore = useOrders()

const router = useRouter()
const route = useRoute()
const orderId = route.params.orderId
const order = ref(null)

onMounted(async () => {
  const adana = await axios.get(`order/${orderId}`)
  order.value = adana.data
})

const orderInformations = computed(() => {
  if (order.value == null) return null
  return {
  'TYPE': order.value.orderType,
  'CURRENT DIVISION': `${order.value.currentRank.division} ${order.value.currentRank.milestone} ${order.value.currentRank.currentLP}`,
  'DESIRED DIVISIOIN': !order.value.desiredRank ? null :`${order.value.desiredRank.division} ${order.value.desiredRank.milestone}`,
  'QUEUE': order.value.queue,
  'SERVER': order.value.server,
  'DUO':  order.value.isSolo ? 'TRUE' : 'FALSE',
  'SOLO ONLY': order.value.isSolo ? 'TRUE' : 'FALSE',
  'PREMIUM': order.value.premium,
  'FLASH': 'DEFAULT',
  'ACCOUNT INFO': 'UNVERIFIED'
  }
})

const champions = computed(() => {
  return Object.values(order.value.champions).flat().slice(0, 3)
})

async function takeOrderAndRoute(orderId) {
  await useOrdersStore.takeOrder(orderId)
  router.push(`/panel/own-order-detail/${orderId}`)
}
</script>

<template lang="pug">
.edit-order(v-if="order != null" )
  .row.first-row
    .row
      .arrow.center-child(@click="router.go(-1)")
        v-icon(icon="mdi-arrow-left-thick" size="50px")
    .state.center-child {{ order.state }}
  .background-template
    .order-and-chat(:style="`border-top: solid 1px ${useAccountStore.user.themePreference.color}; border-left: solid 1px ${useAccountStore.user.themePreference.color};`")
      .row
        .game-background
          v-img(:src='`../../../src/assets/icons/${order.gameType}.png`')
        .order-name {{ order.orderType.toUpperCase() }} BOOST ORDER
        .order-id # {{ order._id.substring(0,10) }}
      .order-process
        .division-process(v-if="order.orderType === 'division'")
          .column
            .process-row
              .current-rank
                .rank-image
                  v-img(:src="`../../../src/assets/ranks/league-of-legends/${order.currentRank.division}.png`")
                .rank-name(:style="{color: (findDominantColorByDivisionName(order.currentRank.division))}") {{ order.currentRank.division.toUpperCase() }} {{ order.currentRank.milestone }}
              .desired-rank
                .rank-image
                  v-img(:src="`../../../src/assets/ranks/league-of-legends/${order.desiredRank.division}.png`")
                .rank-name(:style="{color: (findDominantColorByDivisionName(order.desiredRank.division))}") {{ order.desiredRank.division.toUpperCase() }} {{ order.desiredRank.milestone }}
            .process-bar
        .wind-and-placement-process(v-if="order.orderType === 'win' || order.orderType === 'placements' ")
          .column
            .process-row
              .current-rank
                .rank-image
                  v-img(:src="`../../../src/assets/ranks/league-of-legends/${order.currentRank.division}.png`")
                .rank-name(:style="{color: (findDominantColorByDivisionName(order.currentRank.division))}") {{ order.currentRank.division }} {{ order.currentRank.milestone }}
              .amount-game
                .column
                  .amount {{ order.amountGame.split(' ')[0] }}
                  .games GAMES
      .default-border.rows
        .order-informations
          .information-row(v-for="(a,b) in orderInformations")
            .normal-black-text {{ b }}
            .grey-text {{ a }}
        .last-row(v-if="useAccountStore.user.role == 'booster'")
          .price
            .raw-price 170.30€
            .percentage-price (%65)
          .row
            v-btn.edit-order-button(v-if="!order.note == null && !order.note == ''")
              .little-icon
                v-img(src='@/assets/icons/read-note.png')
              .edit-order-text READ NOTE
            v-btn.accep-order-button(@click="useOrdersStore.takeOrder(order._id)")
              .little-icon
                v-img(src='@/assets/icons/checkmark.png')
        .last-row(v-if="useAccountStore.user.role == 'customer'")
      .champions-text-and-select-lane
        .champions-text CHAMPİONS
        .lanes(v-if="order.lanes.length > 0")
          v-img.lane(v-for="lane in order.lanes" :src="`../../../src/assets/lanes/${lane}.png`")
        div.any-lane-text(v-else) Any Lane
      v-divider
      .champions(v-if="champions.length > 0")
        v-img.champion(v-for="champion in champions" :src="`../../../src/assets/squares/league-of-legends/${champion}.png`")
      div.any-champion-text(v-else) Any Champion
</template>

<style scoped>
.arrow{
  cursor: pointer;
}
.rows {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.price {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.raw-price {
  font-family: Inter;
  font-size: 48px;
  font-weight: bold;
  color: #222;
}
.percentage-price {
  font-family: Inter;
  font-size: 36px;
  font-weight: bold;
  color: #444;
}
.edit-order-text {
  font-size: 20px;
  font-weight: bold;
  color: #000000;
}

.publish-button {
  width: 300px;
  height: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  font-size: 24px;
  font-weight: 600;
  background-color: green;
  margin: 0 auto;
  margin-left: 35%
}
.active-button {
  width: 300px;
  height: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  font-size: 24px;
  font-weight: 600;
  background-color: rgb(45, 128, 151);
  margin: 0 auto;
  margin-left: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(189, 177, 177);
}
.your-note {
  height: 300px;
  margin-bottom: -130px;
}
.champions-text-and-select-lane {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.champions-text {
  font-size: 32px;
  font-weight: 600;
  color: #222;
}
.any-lane-text,
.any-champion-text{
  font-size: 24px;
  font-weight: 600;
  color: #222;

}
.last-row {
  display: flex;
  justify-content: space-between;
}
.little-icon {
  width: 30px;
  height: 30px;
  margin-right: 20px;
}
.plus-icon {
  width: 50px;
  height: 50px;
}
.column-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.default-border {
  border-radius: 10px;
  border: solid 1px #eee;
  width: 850px;
  height: 700px;
  margin: 0 auto;
  padding: 2rem;
}
.order-process {
  border-radius: 10px;
  border: solid 1px #eee;
  width: 850px;
  height: 270px;
  margin: 0 auto;
  padding: 2rem;
  margin-bottom: 3rem;
  margin-top: 1.7rem;
}
.center-child {
  display: flex;
  justify-content: center;
  align-items: center;
}
.first-row {
  max-width: 2200px;
  margin:  0 auto;
  height: 126px;
  box-shadow: 2px 0 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #f9f9f9;
  padding: 20px 50px 30px 20px;
  align-items:center;
  justify-content: space-between;
}
.row {
  display: flex;
  align-items: center;
}
.arrow {
  width: 75px;
  height: 75px;
  border-radius: 9px;
  border: solid 1px #eee;
  background-color: #fff;
}
.need-help {
  width: 200px;
  height: 50px;
  border-radius: 5px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  border: solid 1px #eee;
  background-color: #fff;
  justify-content: space-around;
  margin-left:25px;

}
.need-help-icon {
  height: 30px;
  width: 30px;
}
.black-text {
  font-family: Inter;
  font-size: 20px;
  font-weight: 600;
  color: #222;
}
.normal-black-text {
  font-size: 32px;
  font-weight: 600;
  color: #222;
}
.state {
  width: 200px;
  height: 50px;
  border-radius: 5px;
  box-shadow: 0 4px 4px 0 rgba(160, 83, 12, 0.25);
  background-color: #12e24c;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}
.background-template {
  display: flex;
  max-width: 2243px;
  border-radius: 7px;
  border: solid 1px #eee;
  background-color: #fff;
  flex-wrap: wrap;
  padding: 42px 50px 0 39px;
  margin: 42px 50px 70px 39px;
  gap: 4rem;
}
.order-and-chat,
.order-detail {
  width: 1000px;
  height: 1500px;
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #fff;
  padding: 3rem;
  margin: 0 auto;
}
.game-background {
  width: 75px;
  height: 75px;
  border-radius: 9px;
  border: solid 1px #eee;
}
.order-name {
  font-family: Inter;
  font-size: 40px;
  font-weight: bold;
  color: #222;
  padding-left: 2rem;
}
.order-id {
  font-family: Inter;
  font-size: 40px;
  font-weight: bold;
  color: #555555;
  padding-left: 2rem;
}
.process-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.process-row > * {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.rank-image {
  height: 150px;
  width: 150px;
}
.rank-name {
  font-family: Inter;
  font-size: 24px;
  font-weight: bold;
}
.amount-game {
  width: 100px;
  height: 100px;
  box-shadow: 0 0 8px 0 rgba(255, 168, 0, 0.5);
  border: solid 2px #eeaf0c;
  border-radius:60px;
}
.amount {
  font-size: 36px;
  font-weight: 600;
  text-align: center;
  color: #51341e;
}
.games {
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  color: #a98b3e;
}
.information-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.grey-text {
  font-size: 20px;
  font-weight: 600;
  color: #bbb;
}
.normal-black-text {
  font-size: 20px;
  font-weight: 600;
  color: #222;
}
.big-black-text {

  font-size: 32px;
  font-weight: 600;
  color: #222;
}
.black-id-text {
  font-size: 40px;
  font-weight: bold;
  color: #555;
}
.please-edit-order {
  font-family: Inter;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  color: #f66;
}

.edit-order-button {
  width: 200px;
  height: 50px;
  border-radius: 5px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #fff;
}
.accep-order-button {
  width: 160px;
  height: 50px;
  border-radius: 5px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #54BF00;
  margin-left: 1.5rem;
  padding-left: 40px;
  padding-top: 5px;
}
.save-button {
  width: 140px;
  height: 50px;
  border-radius: 5px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #fff;
  color: #222222;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  cursor: pointer;
}
.lanes {
  display: flex;
}
.lane {
  height: 50px;
  width: 50px;
}
.champions {
  display: flex;
  justify-content: flex-start;
}
.champion {
  height: 50px;
  width: 50px;
}

.account-information {
  width: 900;
  height: 700;
  background-color: #FFFFFF;
}
.title {
  font-size: 24px;
  font-weight: bold;
  padding-left: 1.5rem;
}
.v-text-field {
  padding-right: 1.5rem;
  padding-left: 1.5rem;
}
.flash {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 1.5rem;
}
.d,
.f {
  height: 45px;
  width: 45px;
  font-size: 32px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 15px;
}
.flash-buttons {
  display: flex;
  gap: 13px;
}
</style>

 <script setup>
import axios from 'axios'
import { ref ,computed, onMounted } from 'vue'
import { useOrders } from '@/store/orders'
import { useAccount } from '@/store/account'
import { useRoute } from 'vue-router';
import { findDominantColorByDivisionName } from '@/constants/league-of-legends-constants'

const useAccountStore = useAccount()
const useOrdersStore = useOrders()
const route = useRoute()
const orderId = route.params.orderId
const order = ref(null)

onMounted(async () => {
  console.log('Edit ordera girdik')
  console.log( 'suan bunu kontrol ediyorum'+ orderId)
  const adana = await axios.get(`order/${orderId}`)
  order.value = adana.data
  console.log(order.value)
})
// ;

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


</script>

<template lang="pug">
.edit-order(v-if="order != null")
  .row.first-row
    .row
      .arrow.center-child
        v-icon(icon="mdi-arrow-left-thick" size="50px")
      .need-help.row.center-child
        .need-help-icon
          v-img(src='@/assets/icons/need-help.png')
        .black-text NEED HELP
    .state.center-child {{ order.state }}
  .background-template
    .order-and-chat
      .row
        .game-background
          v-img(:src='`../../../src/assets/icons/${order.gameType}.png`')
        .order-name {{ order.orderType.toUpperCase() }} BOOST ORDER
      .order-process
        .division-process(v-if="order.orderType === 'division'")
          .column
            .process-row
              .previous-rank
                .rank-image
                  v-img(:src="`../../../src/assets/ranks/league-of-legends/${order.currentRank.division}.png`")
                .rank-name(:style="{color: (findDominantColorByDivisionName(order.currentRank.division))}") {{ order.currentRank.division }} {{ order.currentRank.milestone }}
              .current-rank
                .rank-image
                  v-img(:src="`../../../src/assets/ranks/league-of-legends/${order.currentRank.division}.png`")
                .rank-name(:style="{color: (findDominantColorByDivisionName(order.currentRank.division))}") {{ order.currentRank.division }} {{ order.currentRank.milestone }}
              .desired-rank
                .rank-image
                  v-img(:src="`../../../src/assets/ranks/league-of-legends/${order.desiredRank.division}.png`")
                .rank-name(:style="{color: (findDominantColorByDivisionName(order.desiredRank.division))}") {{ order.desiredRank.division }} {{ order.desiredRank.milestone }}
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
            .process-bar
      .chat
        //- OrderChat(orderId=order._id)
    .order-detail
      .information-row
         .big-black-text ORDER DETAILS
         .black-id-text {{ '#' + order._id.substring(0,10) }}
      .default-border
        .order-informations(v-for="(a,b) in orderInformations")
          .information-row
            .normal-black-text {{ b }}
            .grey-text {{ a }}
        .please-edit-order PLEASE EDIT YOUR ORDER AND ADD LOGIN INFO
          span AS SOON AS POSSIBLE
        .last-row
          v-btn.edit-order-button
            .little-icon
              v-img(src='@/assets/icons/edit-order.png')
            .edit-order-text EDIT ORDER
          .select-booster.column-center
            .black-text BOOSTER
            .plus-icon
              v-img(src='@/assets/icons/plus.png')
      v-divider
      .champions-text-and-select-lane
        .champions-text CHAMPİONS
        .lanes(v-if="order.lanes.length > 0")
          v-img.lane(v-for="lane in order.lanes")
        div.any-lane-text(v-else) Any Lane
      v-divider
      .champions(v-if="champions.length > 0" v-for="champion in champions")
      div.any-champion-text(v-else) Any Champion
</template>

<style scoped>
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
  width: 950px;
  height: 1546px;
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  border: solid 1px #e29812;
  background-color: #fff;
  padding: 3rem;
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
  width: 477px;
  height: 48px;
  flex-grow: 0;
  margin: 109px 50px 27px 195px;
  font-family: Inter;
  font-size: 20px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
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
</style>
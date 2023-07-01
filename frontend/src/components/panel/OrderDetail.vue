<script setup>
import axios from 'axios'
import { ref ,computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { findDominantColorByDivisionName } from '@/constants/league-of-legends-constants'
import { useAccount } from '@/store/account'
import { useOrders } from '@/store/orders'
import { findStateColor } from '@/functions/get-colors'

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

  const informations = {
  'TYPE': order.value.orderType,
  'CURRENT DIVISION': `${order.value.currentRank.division} ${order.value.currentRank.milestone} (${order.value.currentRank.currentLP})`,
  'DESIRED DIVISIOIN': !order.value.desiredRank ? null :`${order.value.desiredRank.division} ${order.value.desiredRank.milestone}`,
  'QUEUE': order.value.queue,
  'SERVER': order.value.server,
  'BONUS WIN': order.value.bonusWin ? 'TRUE' : 'FALSE',
  'DUO':  order.value.isSolo ? 'TRUE' : 'FALSE',
  'SOLO ONLY': order.value.isSolo ? 'TRUE' : 'FALSE',
  'PREMIUM': order.value.premium ? 'TRUE' : 'FALSE',
  'FLASH': order.value.flash,
  'ACCOUNT INFO': 'UNVERIFIED',
  }

  return Object.fromEntries(
        Object.entries(informations).filter(([key, value]) => value != null)
    );

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
    .state.center-child(:style="{backgroundColor: findStateColor(order.state)}") {{ order.state.toUpperCase() }}
  .background-template
    .order-and-chat(:style="`border-top: solid 1px ${useAccountStore.user.themePreference.color}; border-left: solid 1px ${useAccountStore.user.themePreference.color};`")
      .title-row
        div.row
          img.game-background(:src='`../../../src/assets/icons/${order.game}.png`')
          .order-name {{ order.orderType.toUpperCase() }} BOOST ORDER
        div
          .order-id # {{ order._id.substring(0,10) }}
      .order-process
        .division-process(v-if="order.orderType === 'division'")
          .column
            .process-row
              .current-rank
                img.rank-image(:src="`../../../src/assets/ranks/league-of-legends/${order.currentRank.division}.png`")
                .rank-name(:style="{color: (findDominantColorByDivisionName(order.currentRank.division))}") {{ order.currentRank.division.toUpperCase() }} {{ order.currentRank.milestone }}
              img.to-where(src='../../assets/to-where.png')
              .desired-rank
                img.rank-image(:src="`../../../src/assets/ranks/league-of-legends/${order.desiredRank.division}.png`")
                .rank-name(:style="{color: (findDominantColorByDivisionName(order.desiredRank.division))}") {{ order.desiredRank.division.toUpperCase() }} {{ order.desiredRank.milestone }}
            .process-bar
        .wind-and-placement-process(v-else)
          .column
            .process-row
              .current-rank
                img.rank-image(:src="`../../../src/assets/ranks/league-of-legends/${order.currentRank.division}.png`")
                .rank-name(:style="{color: (findDominantColorByDivisionName(order.currentRank.division))}") {{ order.currentRank.division }} {{ order.currentRank.milestone }}
              .amount-game(:style="{ border: 'solid 2px ' + findDominantColorByDivisionName(order.currentRank.division) , boxShadow: '0 0 8px 0' + findDominantColorByDivisionName(order.currentRank.division)}")
                .column
                  .amount(v-if="order.orderType == 'lesson'") {{ order.hours.split(' ')[0] }}
                  .amount(v-else) {{ order.amountGame.split(' ')[0] }}
                  .games GAMES
      .default-border.rows
        .order-informations
          .information-row(v-for="(a,b) in orderInformations")
            .normal-black-text {{ b }}
            .grey-text {{ a.toUpperCase() }}
        .last-row(v-if="useAccountStore.user.role == 'booster'")
          .price
            .raw-price 170.30€
            .percentage-price (%65)
          .row
            v-tooltip(location="left" :text='order.note' )
              template(v-slot:activator='{ props }')
                v-btn.edit-order-button(v-if="order.note" v-bind='props')
                  img.medium-icon(src='@/assets/icons/read-note.png')
                  .edit-order-text READ NOTE
            v-btn.accep-order-button(@click="useOrdersStore.takeOrder(order._id)")
              img.little-icon(src='@/assets/icons/checkmark.png')
        .last-row(v-if="useAccountStore.user.role == 'customer'")
      .champions-text-and-select-lane
        .champions-text CHAMPİONS
        .lanes(v-if="order.lanes.length > 0")
          img.lane(v-for="lane in order.lanes" :src="`../../../src/assets/lanes/${lane}.png`")
        div.any-lane-text(v-else) Any Lane
      .champions(v-if="champions.length > 0")
        img.champion(v-for="champion in champions" :src="`../../../src/assets/squares/league-of-legends/${champion}.png`")
      div.any-champion-text(v-else) Any Champion
</template>

<style scoped>
.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.edit-order{
  font-family: Inter;
}
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
  font-size: 48px;
  font-weight: bold;
  color: #222;
}
.percentage-price {
  font-size: 36px;
  font-weight: bold;
  color: #444;
}
.edit-order-text {
  font-size: 20px;
  font-weight: bold;
  color: #000000;
}
.champions-text-and-select-lane {
  margin: 55px -3rem 46px -3rem;
  padding: 6px 22px 7px 39px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 1px #eee;
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
.medium-icon {
  width: 26.25px;
  height: 26.25px;
  margin-right: 20px;
}
.little-icon {
  width: 27px;
  height: 21px;
  margin-right: 20px;
}
.default-border {
  border-radius: 10px;
  border: solid 1px #eee;
  width: 900px;
  height: 600px;
  margin: 0 auto;
  padding: 2rem;
}
.order-process {
  border-radius: 10px;
  border: solid 1px #eee;
  margin: 0 auto;
  padding: 0.5rem 0 2rem 0 ;
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
  width: 72px;
  height: 72px;
  border-radius: 9px;
  border: solid 1px #eee;
}
.order-name {
  font-size: 38px;
  font-weight: bold;
  color: #222;
  padding-left: 1.5rem;
}
.order-id {
  font-size: 38px;
  font-weight: bold;
  color: #555555;
}
.process-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 5rem;
}
.to-where {
  margin-top: 1rem;
}
.process-row > * {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.rank-image {
  height: 150px;
  width: 150px;
}
.rank-name {
  font-size: 24px;
  font-weight: bold;
}
.amount-game {
  width: 100px;
  height: 100px;
  /* box-shadow: 0 0 8px 0 rgba(255, 168, 0, 0.5); */
  /* border: solid 2px #eeaf0c; */
  border-radius:60px;
  margin-top: 1.5rem;
  margin-left: -20rem;
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
</style>

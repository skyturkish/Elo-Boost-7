<script setup>
import { computed } from 'vue'
import TakeOrderButton from '@/components/order/TakeOrderButton'
import DeleteOrderButton from '@/components/order/DeleteOrderButton'
import ChatButton from '@/components/order/ChatButton'
import { LeagueOfLegendsDivisions } from '@/constants/league-of-legends-constants'
import { useOrders } from '@/store/orders'
import { useAccount } from '@/store/account'
import { useRouter} from 'vue-router'

const router = useRouter()
const useAccountStore = useAccount()
const useOrdersStore = useOrders()

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

const champions = computed(() => {
  return Object.values(props.order.champions).flat().slice(0, 3)
})

</script>

<template lang="pug">
.order
  .row
    .isSolo(v-if="useAccountStore.isBooster()") {{ order.isSolo ? 'Solo' : 'Duo' }}
    .state(v-else) {{ order.state }}
    .id {{ '#' + order._id.substring(0,10) }}
  .orderType {{ order.orderType.toUpperCase() + ' BOOST ORDER' }}
  .place
    .division-order(v-if='order.orderType == "division"')
      .flex-column
        v-img.division-image(:src='`../../src/assets/ranks/league-of-legends/${order.currentRank.division}.png`')
        .division-name(:style="{color: (LeagueOfLegendsDivisions.find(rank => rank.name === order.currentRank.division).dominantColor) }") {{ order.currentRank.division.toUpperCase() + ' ' + order.currentRank.milestone }}
      v-img.to-where(width="0.7rem" src='../../assets/to-where.png')
      .flex-column
        v-img.division-image(:src='`../../src/assets/ranks/league-of-legends/${order.desiredRank.division}.png`')
        .division-name(:style="{color: (LeagueOfLegendsDivisions.find(rank => rank.name === order.desiredRank.division).dominantColor) }") {{ order.desiredRank.division.toUpperCase() + ' ' + order.desiredRank.milestone }}
    .win-order(v-else-if='order.orderType == "win"')
      .flex-column
        v-img.division-image(:src='`../../src/assets/ranks/league-of-legends/${order.currentRank.division}.png`')
        .division-name(:style="{color: (LeagueOfLegendsDivisions.find(rank => rank.name === order.currentRank.division).dominantColor) }") {{ order.currentRank.division.toUpperCase() + ' ' + order.currentRank.milestone }}
        .amount-game {{ order.amountGame.split(' ')[0] }}
    .placements-order(v-else-if='order.orderType == "placements"')
      .flex-column
        v-img.division-image(:src='`../../src/assets/ranks/league-of-legends/${order.currentRank.division}.png`')
        .division-name(:style="{color: (LeagueOfLegendsDivisions.find(rank => rank.name === order.currentRank.division).dominantColor) }") {{ order.currentRank.division.toUpperCase() + ' ' + order.currentRank.milestone }}
        .amount-game {{ order.amountGame.split(' ')[0] }}
    .normal-order(v-else-if='order.orderType == "normal-game"')
      img(:src='`../../src/assets/games/leagueOfLegends/divisions/${order.division}.png`')
    .clash-order(v-else-if='order.orderType == "clash"')
      img(:src='`../../src/assets/games/leagueOfLegends/divisions/${order.division}.png`')
    .challenge-order(v-else-if='order.orderType == "challenge"')
      img(:src='`../../src/assets/games/leagueOfLegends/divisions/${order.division}.png`')
  .row.padding-top-medium.padding-horizontal-medium
    .server {{ order.server.toUpperCase() }}
    .pay(v-if="useAccountStore.isBooster()") (%65)
  .row.padding-horizontal-medium
    .lane JUNGLE
    .price 170.30€
  .row.padding-horizontal-medium
    .champions
      v-img.champion(v-for="champion in champions" :src='`../../src/assets/squares/league-of-legends/${champion}.png`')
    .buttons.row
      .edit-and-release(v-if="order.state == 'payed'" @click='router.push(`/panel/edit-order/${order._id}`)') EDIT AND RELEASE
      .more(v-else @click='router.push(`/panel/order-detail/${order._id}`)')
        v-img(src='../../assets/icons/menu.png')
      .take-order(v-if='order.state == "active" && useAccountStore.isBooster()' @click="useOrdersStore.takeOrder(order._id)")
        v-img(src='../../assets/icons/checkmark.png')
</template>

<style scoped>
.order {
  height: 18.75rem;
  width: 18.75rem;
  font-family: Inter;
  padding: 15px 12px 35px 20px;
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  border: solid 1px #bc2842;
  background-color: #fff;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.isSolo {
  font-size: 12px;
  font-weight: 800;
  color: #000;
}
.id {
  font-size: 13px;
  font-weight: 800;
  color: #555;
}
.orderType {
  font-size: 16px;
  font-weight: bold;
  color: #000;
  text-align: center;
  padding-top: 0.4rem;
}
.place {
  height: 7rem;
  margin: 0 auto;
  margin-top: -0.7rem;
}
.division-order {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.division-image {
  width: 5.875rem;
  height: 5.5rem;
}
.division-name {
  font-size: 15px;
  font-weight: bold;
}
.amount-game {
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #111;

}
.padding-top-medium {
  padding-top: 1rem;
}
.padding-horizontal-medium {
  padding-left: 0.8rem;
  padding-right: 0.8rem;
}
.to-where {
  width: 1rem;
  height: 1rem;
}
.server {
  font-size: 12px;
  font-weight: bold;
  color: #444;
}
.pay {
  font-size: 12px;
  font-weight: bold;
  color: #444;
}
.lane {
  font-size: 16px;
  font-weight: bold;
  color: #222;
}
.price {
  font-size: 24px;
  font-weight: bold;
  color: #222;
}
.champions {
  display: flex;
}
.champion {
  width: 30px;
  height: 30px;
  border-radius: 48px;
  border: solid 0.5px #000;
  margin-left: -10px
}
.champions .champion:first-child {
  margin-left: 0px;
}
.more,
.take-order {
  width: 24px;
  height: 24px;
  border-radius: 2px;
  padding: 5px;
  display:flex;
  align-items: center;
  cursor: pointer;
}
.more {
  background-color: #bababa;
}
.take-order {
  background-color: #54BF00;
}
.edit-and-release {
  width: 120px;
  height: 24px;
  border-radius: 8px;
  padding: 5px;
  display:flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  font-weight: bold;
  cursor: pointer;
  background-color: #9EB339;
}
.buttons {
  gap: 4.5px;
}
</style>
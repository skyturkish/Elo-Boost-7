<script setup>
import TakeOrderButton from '@/components/order/TakeOrderButton'
import DeleteOrderButton from '@/components/order/DeleteOrderButton'
import ChatButton from '@/components/order/ChatButton'
import { LeagueOfLegendsDivisions } from '@/constants/league-of-legends-constants'


const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

const imgUrls = import.meta.glob('../../assets/ranks/league-of-legends/*.png', {
  import: 'default',
  eager: true
})
</script>

<template lang="pug">
.order
  .row
    .isSolo {{ order.isSolo ? 'Solo' : 'Duo' }}
    .id {{ order._id.substring(0,9) + '...' }}
  .orderType {{ order.orderType.toUpperCase() + ' BOOST ORDER' }}
  .place
    .division-order(v-if='order.orderType == "division"')
      .flex-column
        v-img.division-image(:src="imgUrls['../../assets/ranks/league-of-legends/' + order.currentRank.division + '.png']")
        .division-name(:style="{color: (LeagueOfLegendsDivisions.find(rank => rank.name === order.currentRank.division).dominantColor) }") {{ order.currentRank.division.toUpperCase() + ' ' + order.currentRank.milestone }}
      v-img.to-where(width="0.7rem" src='../../assets/to-where.png')
      .flex-column
        v-img.division-image(:src="imgUrls['../../assets/ranks/league-of-legends/' + order.desiredRank.division + '.png']")
        .division-name(:style="{color: (LeagueOfLegendsDivisions.find(rank => rank.name === order.desiredRank.division).dominantColor) }") {{ order.desiredRank.division.toUpperCase() + ' ' + order.desiredRank.milestone }}
    .win-order(v-else-if='order.orderType == "win"')
      .flex-column
        v-img.division-image(:src="imgUrls['../../assets/ranks/league-of-legends/' + order.currentRank.division + '.png']")
        .division-name(:style="{color: (LeagueOfLegendsDivisions.find(rank => rank.name === order.currentRank.division).dominantColor) }") {{ order.currentRank.division.toUpperCase() + ' ' + order.currentRank.milestone }}
        .amount-game {{ order.amountGame.split(' ')[0] }}
    .placements-order(v-else-if='order.orderType == "placements"')
      .flex-column
        v-img.division-image(:src="imgUrls['../../assets/ranks/league-of-legends/' + order.currentRank.division + '.png']")
        .division-name(:style="{color: (LeagueOfLegendsDivisions.find(rank => rank.name === order.currentRank.division).dominantColor) }") {{ order.currentRank.division.toUpperCase() + ' ' + order.currentRank.milestone }}
        .amount-game {{ order.amountGame.split(' ')[0] }}
    .normal-order(v-else-if='order.orderType == "normal-game"')
      img(:src='imgUrls[`../../assets/games/leagueOfLegends/divisions/${order.division}.png`]')
    .clash-order(v-else-if='order.orderType == "clash"')
      img(:src='imgUrls[`../../assets/games/leagueOfLegends/divisions/${order.division}.png`]')
    .challenge-order(v-else-if='order.orderType == "challenge"')
      img(:src='imgUrls[`../../assets/games/leagueOfLegends/divisions/${order.division}.png`]')
  .row.padding-top-medium.padding-horizontal-medium
    .server {{ order.server.toUpperCase() }}
    .pay (%65)
  .row.padding-horizontal-medium
    .lane JUNGLE
    .price 170.30€
  .row.padding-horizontal-medium
    .champions {{ order.champions }}
    v-icon(icon="mdi-menu").more

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
</style>
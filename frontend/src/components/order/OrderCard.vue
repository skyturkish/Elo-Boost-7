<script setup>
import { computed } from 'vue'
import { findDominantColorByDivisionName } from '@/constants/league-of-legends-constants'
import { findColorByDivisionName } from '@/constants/valorant-constants'
import { findStateColor } from '@/functions/get-colors'
import { useOrders } from '@/store/orders'
import { useAccount } from '@/store/account'
import { useRouter} from 'vue-router'

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

function minutesAgo(timeString) {
  let pastTime = dayjs(timeString);
  let currentTime = dayjs();

  let differenceInMinutes = dayjs.duration(currentTime.diff(pastTime)).asMinutes();

  return Math.floor(differenceInMinutes);
}
const router = useRouter()
const useAccountStore = useAccount()
const useOrdersStore = useOrders()

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})


function findColor(division) {
  if(props.order.game == 'league-of-legends') {
    return findDominantColorByDivisionName(division)
  } else if (props.order.game == 'valorant') {
    return findColorByDivisionName(division)
  }

}

const currentDivisionUrl = computed(() => {
  if (props.order.game == 'league-of-legends') {
    return `https://storage.googleapis.com/divine-boost-bucket/assets/assets/ranks/${props.order.game}/${props.order.currentRank.division}.webp`
  } else if (props.order.game == 'valorant') {
    return `https://storage.googleapis.com/divine-boost-bucket/assets/assets/ranks/${props.order.game}/${props.order.currentRank.division}-${props.order.currentRank.milestone}.webp`
  }
})

const desiredDivisionUrl = computed(() => {
  if (!props.order.desiredRank) return ''
  if (props.order.game == 'league-of-legends') {
    return `https://storage.googleapis.com/divine-boost-bucket/assets/assets/ranks/${props.order.game}/${props.order.desiredRank.division}.webp`
  } else if (props.order.game == 'valorant') {
    return `https://storage.googleapis.com/divine-boost-bucket/assets/assets/ranks/${props.order.game}/${props.order.desiredRank.division}-${props.order.desiredRank.milestone}.webp`
  }
})

const goToOrderDetailPage = (order) => {
  const orderState = order.state
  const orderCustomerId = order.customer
  const orderboosterId = order.booster
  const userRole = useAccountStore.user.role
  const userId = useAccountStore.user._id

  const isBelongToUser = userRole == 'customer' ? orderCustomerId == userId : orderboosterId == userId

  if (isBelongToUser && orderState != 'done') {
    router.push(`/panel/own-order-detail/${order._id}`)
  } else {
    router.push(`/panel/order-detail/${order._id}`)
  }
}

const heroes = computed(() => {
  return Object.values(props.order.heroes).flat().slice(0, 3)
})

</script>

<template lang="pug">
.order(:style="`border-top: solid 1px ${useAccountStore.user.themePreference.color}; border-left: solid 1px ${useAccountStore.user.themePreference.color};`")
  .row
    .isSolo(v-if="useAccountStore.isBooster" :style="{color: order.isSolo ?  useAccountStore.user.themePreference.color :  '#000000' }") {{ order.isSolo ? 'Solo' : 'Duo' }}
    .state(v-else :style="{color: findStateColor(order.state), textShadow: `0 0 15px ${findStateColor(order.state)}` }") {{ order.state }}
    .isSolo {{  minutesAgo(order.createdAt) }}
    .id {{ '#' + order._id.substring(0,10) }}
  .orderType {{ order.orderType + ' BOOST ORDER' }}
  .place
    .division-order(v-if='order.orderType == "division"' :style="{paddingTop: order.game == 'valorant' ?  '1rem' : ''}")
      .flex-column
        img.division-image(:src="currentDivisionUrl" alt="divisionimage")
        .division-name(:style="{color: findColor(order.currentRank.division) }") {{ order.currentRank.division + ' ' + order.currentRank.milestone }}
      img.to-where(src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/to-where.webp' alt="to-where")
      .flex-column
        img.division-image(:src="desiredDivisionUrl" alt="divisionimage")
        .division-name(:style="{color: findColor(order.desiredRank.division) }") {{ order.desiredRank.division + ' ' + order.desiredRank.milestone }}
    .normal-order(v-else-if='order.orderType == "normal-game"')
      img(:src='`https://storage.googleapis.com/divine-boost-bucket/assets/assets/games/leagueOfLegends/divisions/${order.division}.webp`' alt="divisionimage")
    .clash-order(v-else-if='order.orderType == "clash"')
      img(:src='`https://storage.googleapis.com/divine-boost-bucket/assets/assets/games/leagueOfLegends/divisions/${order.division}.webp`' alt="divisionimage")
    .challenge-order(v-else-if='order.orderType == "challenge"')
      img(:src='`https://storage.googleapis.com/divine-boost-bucket/assets/assets/games/leagueOfLegends/divisions/${order.division}.webp`' alt="divisionimage")
    .else(v-else)
      .flex-column
        img.division-image(:src="currentDivisionUrl" alt="divisionimage")
        .division-name(:style="{color: findColor(order.currentRank.division) }") {{ order.currentRank.division + ' ' + order.currentRank.milestone }}
        .amount-game(v-if="order.orderType == 'lesson'") {{ order.hours.split(' ')[0] }}
        .amount-game(v-else) {{ order.amountGame.split(' ')[0] }}
  .order-informations(v-if="useAccountStore.isBooster")
    .server(v-if="order.category == 'boosting'") {{ order.server }}
    .server(v-else) {{ order.languages[0] }}
    .pay (%65)
    .lane JUNGLE
    .price 170.30€
    .champions(v-if="heroes.length > 0")
      img.champion(v-for="hero in heroes" :key="hero" :src='`https://storage.googleapis.com/divine-boost-bucket/assets/assets/squares/league-of-legends/${hero}.webp`' alt="champion")
    .any-champion(v-else)
      .any-hero Any Hero
    .buttons.row
      .edit-and-release(v-if="order.state == 'paid'" @click='router.push(`/panel/own-order-detail/${order._id}`)') EDIT AND RELEASE
      img.more(v-else @click='goToOrderDetailPage(order)' src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/menu.webp' alt="more")
      img.take-order(v-if='order.state == "active" && useAccountStore.isBooster' @click="useOrdersStore.takeOrder(order._id)" src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/checkmark.webp' alt="take-order")
  .order-informations(v-else)
    .lane JUNGLE
    .server(v-if="order.category == 'boosting'") {{ order.server }}
    .server(v-else) {{ order.languages[0] }}
    .price {{ order.price }}
    .buttons.row
      img.more(@click='goToOrderDetailPage(order)' src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/menu.webp' alt="more")
</template>

<style scoped>
.order:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
.state {
  text-shadow: 0 0 15px rgba(0, 160, 64, 0.35);
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
}
.order-informations {
  display:flex;
  flex-wrap: wrap;
  padding-top: 1rem;
  align-items: center;
}
.order-informations > * {
  width: 50%;
}
.order-informations > :nth-child(2),
.order-informations > :nth-child(4),
.order-informations > :nth-child(6) {
  display:flex;
  justify-content: flex-end;
}
.order {
  height: 18.75rem;
  width: 18.75rem;

  padding: 15px 12px 35px 20px;
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #fff;
  display:flex;
  flex-direction: column;
  justify-content: space-between;

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
  text-transform: uppercase;
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
  text-transform: uppercase;
}
.place {
  height: 7rem;
  margin-top: -0.7rem;

}
.division-order {
  display: flex;
  align-items: center;
  justify-content: space-around;

}
.division-image {
  width: 5.875rem;
  height: 5.5rem;
}
.division-name {
  font-size: 15px;
  font-weight: bold;
  padding-top: 0.3rem;
  text-transform: uppercase;
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
}
.server {
  font-size: 12px;
  font-weight: bold;
  color: #444;
  text-transform: uppercase;
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
.any-hero {
  font-size: 24px;
  font-weight: bold;
  color: #222;
}
.champions {
  display: flex;
}
.champion {
  height: 30px;
  width: 30px;
  margin-left: -10px;
  border: solid 0.5px #000;
  border-radius: 50%;
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
  justify-content: end;
}
</style>
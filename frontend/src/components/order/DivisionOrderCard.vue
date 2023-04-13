<script setup>
import { toRefs } from 'vue'

import TakeOrderButton from '@/components/order/TakeOrderButton'
import DeleteOrderButton from '@/components/order/DeleteOrderButton'

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})
const { order } = toRefs(props);

const imgUrls = import.meta.glob('../../assets/games/leagueOfLegends/divisions/*.png', {
  import: 'default',
  eager: true
})
</script>

<template lang="pug">
.divisionOrder
  v-card.mx-auto.divisionOrder
    v-card-title.card-title
      div
        | {{ order.orderType }} {{ order.state }}
      DeleteOrderButton(:orderId='order._id')
    .toRank
      .rank
        img(:src='imgUrls[`../../assets/games/leagueOfLegends/divisions/${order.currentRank.division}.png`]' :alt='order.currentRank.division')
        div {{ order.currentRank.division }} {{ order.currentRank.mileStone }}
      div
        | ----->
      .rank
        img(:src='imgUrls[`../../assets/games/leagueOfLegends/divisions/${order.desiredRank.division}.png`]' :alt='order.desiredRank.division')
        div {{ order.desiredRank.division }} {{ order.desiredRank.mileStone }}
    h3  __server: {{ &grave;${order.server}&grave;}}
    h3  __{{ order.gainingLP }}
    h3 {{ order.booster  }}
    v-card-actions
      TakeOrderButton(:orderId='order._id')
</template>

<style scoped>

.card-title {
  display: flex;
  justify-content: space-between;
}
.order {
    background-color: aqua;
}
.divisionOrder {
    background-color: rgb(137, 148, 148);

}
img {
  max-width: 5rem;
  max-width: 3rem;
}
.toRank {
  gap: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>

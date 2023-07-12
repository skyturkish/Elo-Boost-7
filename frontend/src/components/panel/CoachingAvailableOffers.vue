<script setup>
import OrderCard from '../order/OrderCard.vue'
import { useOrders } from '@/store/orders'
import { onMounted } from 'vue'
import FilterTitle from '../panel/FilterTitle.vue'

const useOrdersStore = useOrders()

onMounted(() => {
  useOrdersStore.startListeningOrders()
})

</script>

<template lang="pug">
.current-offers
  .horizontal-padding
    FilterTitle(title="COACHING AVAILABLE OFFERS")
  .place-order
    .orders
      .order(v-if="useOrdersStore.availableCoachingOrders.length != 0" v-for='order in useOrdersStore.availableCoachingOrders' :key='order')
        OrderCard(:order='order')
      div(v-else)
       h1 There is no available {{  useOrdersStore.filteredGame }} order right now,
</template>

<style scoped>
.horizontal-padding {
  padding: 0 2.625rem;
}
.current-offers {

  padding-top: 2.2rem;
  min-width: 1440px;
}
.place-order  {
  padding: 2.625rem;
}
.orders {
    border-radius: 7px;
    border: solid 1px #eee;
    background-color: #fff;
    padding: 3rem;
    display: flex;
    gap: 2.5rem;
    max-width: 1840px;
    flex-wrap: wrap;
    justify-content: center;
    min-height: 40.625rem;
}
</style>

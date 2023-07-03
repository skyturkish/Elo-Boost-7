<script setup>
import { onMounted, computed  } from 'vue'
import { useOrders } from '@/store/orders'
import OrderCard from '../order/OrderCard.vue'
import FilterTitle from '../panel/FilterTitle.vue'

const useOrdersStore = useOrders()

onMounted(async () =>   {
  await useOrdersStore.fetchMyOrdersIfNotFetched()
})

const filteredOrders = computed(() => {
  return useOrdersStore.filteredGameMyOrders.filter(order => order.state === 'assigned').filter(order => order.category === 'coaching')
})

</script>

<template lang="pug">
.current-offers
  .horizontal-padding
    FilterTitle(title="COACHING CURRENT OFFERS")
  .place-order
    .orders
      .order(v-if="filteredOrders.length != 0" v-for='order in filteredOrders' :key='order')
        OrderCard(:order='order')
      .a(v-else)
        h1 There is no {{ useOrdersStore.filteredGame }} order right now, just take one
</template>

<style scoped>
.horizontal-padding {
  padding: 0 2.625rem;
}
.current-offers {
  font-family: Inter;
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

<script setup>
import { ref, onMounted  } from 'vue'
import axios from 'axios'
import OrderCard from '@/components/order/OrderCard'
import { useAccount } from '@/store/account'

const useAccountStore = useAccount()
const orders = ref([])

onMounted(async () =>   {
  const currentOrders = await axios.get(`/coaching/${useAccountStore.user.role}/${useAccountStore.user._id}`)
  orders.value = currentOrders.data
})

</script>

<template lang="pug">
.current-offers
  .horizontal-padding
    .first-place
      .first-row
        .game-icon
          v-img(src='../../assets/icons/league-of-legends.png')
        .offer-title YOUR COACHİNG ORDERS
      v-icon.settings-icon(icon='mdi-cog' size="33px")
  .place-order
    .orders
      .order(v-if="orders.length != 0" v-for='order in orders' :key='order')
        h1 {{order}}
      .a(v-else)
        h1 You have no orders
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
.first-place {
  margin: 0 auto;
  height: 100px;
  max-width: 1100px;
  border-radius: 7px;
  border: solid 1px #eee;
  background-color: #fff;
  display:flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 33px 15px 12px;
}
.first-row {
  display: flex;
  width: 580px;
  align-items: center;
  justify-content: space-between;
}
.game-icon {
  width: 4.6875rem;
  height: 4.6875rem;
  border-radius: 9px;
  border: solid 1px #eee;
}
.offer-title {
  font-size: 32px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #222;
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

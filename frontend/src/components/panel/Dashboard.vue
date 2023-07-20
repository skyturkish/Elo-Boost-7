<script setup>
import { onMounted} from 'vue'
import { useAccount } from '@/store/account'
import { useOrders } from '@/store/orders'
import OrderCard from '../order/OrderCard.vue'

const useOrdersStore = useOrders()
const useAccountStore = useAccount()

onMounted(() => {
  if(useAccountStore.isBooster) {
    useOrdersStore.startListeningOrders()
  } else {
    useOrdersStore.fetchMyOrdersIfNotFetched()
  }
})
</script>

<template lang="pug">
div.dashboard
  .first-column
    .first-row
      img.progress(v-if="useAccountStore.isBooster" src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/earnings%20.webp")
      img.progress(v-else src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/progression.webp")
      .balance-box(v-if="useAccountStore.isBooster")
        div
          .middle-black-text Balance
          .balance  {{ useAccountStore.user.balance.toString().split('.')[0] }}
            span.small-text ,{{ useAccountStore.user.balance.toFixed(2).toString().split('.')[1] }}€
              span.in-total-text in total
      .balance-box(v-else)
        div
          .middle-black-text Balance
          .balance  {{ useAccountStore.user.balance.toString().split('.')[0] }}
            span.small-text ,{{ useAccountStore.user.balance.toFixed(2).toString().split('.')[1] }}€
        v-btn.deposit-button DEPOSIT
    .second-column
      .row
        .middle-black-text Notifications
      .orders
        .order(v-if="useOrdersStore.notificationOrders.length != 0" v-for='order in useOrdersStore.notificationOrders' :key='order')
          OrderCard(:order='order')
        div(v-else)
          h1 There is no convenient order for you right now, will list soon

</template>

<style scoped>
.second-column {
  padding: 2rem;
  margin-top: 2rem;
  border-radius: 10px;
  border: 1px solid #EEE;
  background: #FFF;
}
.first-column {
  display: flex;
  flex-direction: column;
}
.first-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
}
.dashboard {
  margin: 2rem;
}
.progress {
  width: 791px;
  height: 308px;
}
.balance-box {
  width: 270px;
  height: 300px;
  border-radius: 10px;
  border: 1px solid #EEE;
  background: #FFF;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.middle-black-text {
  color: #171120;
  font-size: 16px;
  font-weight: 600;
}
.balance {
  font-size: 32px;
  font-weight: 600;
  padding: 0.5rem;
}
.small-text {
  color: rgba(23, 17, 32, 0.58);
  font-size: 24px;
  font-weight: 600;
}
.in-total-text {
  color: rgba(121, 117, 126, 0.53);
  font-size: 16px;
  font-weight: 600;
  margin-left: 0.5rem;
}

.deposit-button {
  width: 220px;
  height: 50px;
  border-radius: 7px;
  background-image: linear-gradient(to right, #E7AE8C, #EC5800);
  color: #FFF;
  font-size: 24px;
  font-weight: 700;
}
.orders {
    border-radius: 7px;
    background-color: #fff;
    padding: 3rem;
    max-width: 1880px;
    display: flex;
    gap: 2.5rem;
    flex-wrap: wrap;
    justify-content: center;
    min-height: 40.625rem;
}
</style>

<script setup>
import axios from 'axios'
import { ref ,computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { findDominantColorByDivisionName } from '@/constants/league-of-legends-constants'
import { useAccount } from '@/store/account'
import { useOrders } from '@/store/orders'
import { findStateColor } from '@/functions/get-colors'
import PreviewOrder from '@/components/panel/PreviewOrder.vue'
import ChampionsOrAgents from '@/components/panel/ChampionsOrAgents.vue'
import OrderInformations from '@/components/panel/OrderInformations.vue'

const useAccountStore = useAccount()
const useOrdersStore = useOrders()

const router = useRouter()
const route = useRoute()
const orderId = route.params.orderId
const order = ref(null)

onMounted(() => {
  axios.get(`order/${orderId}`).then((res) => {
    order.value = res.data
  })
})

async function takeOrderAndRoute(orderId) {
  await useOrdersStore.takeOrder(orderId)
  router.push(`/panel/own-order-detail/${orderId}`)
}
</script>

<template lang="pug">
.edit-order(v-if="order != null" )
  .first-row
    .row
      .arrow.center-child(@click="router.go(-1)")
        img.arrow-image(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/arrow-left.webp" alt="arrow")
    .state.center-child(:style="{backgroundColor: findStateColor(order.state)}") {{ order.state }}
  .background-template
    .order-and-chat(:style="`border-top: solid 1px ${useAccountStore.user.themePreference.color}; border-left: solid 1px ${useAccountStore.user.themePreference.color};`")
      .title-row
        div.row
          img.game-background(:src='`https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/${order.game}.webp`' alt="game-image")
          .order-name {{ order.orderType }} BOOST ORDER
        div
          .order-id # {{ order._id.substring(0,10) }}
      PreviewOrder(:order='order')
      .default-border.rows
        OrderInformations(:order='order')
        .last-row(v-if="useAccountStore.isBooster")
          .price
            .raw-price 170.30€
            .percentage-price (%65)
          .row
            v-tooltip(location="left" :text='order.note' )
              template(v-slot:activator='{ props }')
                v-btn.edit-order-button(v-if="order.note" v-bind='props')
                  img.medium-icon(src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/read-note.webp' alt="read-note")
                  .edit-order-text READ NOTE
            v-btn.accep-order-button(v-if="order.state == 'active'" @click="useOrdersStore.takeOrder(order._id)")
              img.little-icon(src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/checkmark.webp' alt="checkmark")
        .last-row(v-if="useAccountStore.user.role == 'customer'")
      ChampionsOrAgents(:order="order")
</template>

<style scoped>
.arrow-image {
  width: 26px;
  height: 25px;
}
.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.edit-order{

  display:flex;
  flex-direction: column;
  align-items: center;
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
  padding: 2rem;
}
.center-child {
  display: flex;
  justify-content: center;
  align-items: center;
}
.first-row {
  box-shadow: 2px 0 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #f9f9f9;
  padding: 1.3rem;
  display: flex;
  align-items: center;
  align-items:center;
  justify-content: space-between;
  width: 100vw;
}
.background-template {
  border-radius: 7px;
  border: solid 1px #eee;
  background-color: #fff;
  padding: 42px 50px 48px 39px;
  margin: 42px 50px 70px 39px;
  margin-right: 20rem;

}
.state {
  width: 200px;
  height: 50px;
  border-radius: 5px;
  box-shadow: 0 4px 4px 0 rgba(160, 83, 12, 0.25);
  font-size: 20px;
  font-weight: bold;
  margin-right: 15rem;
  color: #fff;
  text-transform: uppercase;
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
.order-and-chat,
.order-detail {
  width: 1000px;
  height: 1400px;
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
  text-transform: uppercase;
}
.order-id {
  font-size: 38px;
  font-weight: bold;
  color: #555555;
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
.account-information {
  width: 900;
  height: 700;
  background-color: #FFFFFF;
}
</style>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import OrderInformations from '@/components/panel/OrderInformations.vue'
import PreviewOrder from '@/components/panel/PreviewOrder.vue'
import axios from 'axios'

import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'
import { useValorantOrder } from '@/store/valorant-order'

const router = useRouter();
const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()
const currentValorantOrder = useValorantOrder()
const route = useRoute()
const game = route.params.game
const type = route.params.type

const order = computed(() => {
  if(game == 'league-of-legends') {
    switch(type) {
      case 'division':
        return currentLeagueOfLegendsOrder.divisionOrder
      case 'win':
        return currentLeagueOfLegendsOrder.winOrder
      case 'placements':
        return currentLeagueOfLegendsOrder.placementsOrder
      case 'normal-game':
      return currentLeagueOfLegendsOrder.normalGameOrder
      case 'lesson':
        return currentLeagueOfLegendsOrder.lessonOrder
      case 'game-replay':
        return currentLeagueOfLegendsOrder.gameReplayOrder
      case 'live-game':
      return currentLeagueOfLegendsOrder.liveGameOrder
      case 'play-together':
      return currentLeagueOfLegendsOrder.playTogetherOrder
    }
  }else if(game == 'valorant') {
    switch(type) {
      case 'division':
        return currentValorantOrder.divisionOrder
      case 'win':
        return currentValorantOrder.winOrder
      case 'placements':
        return currentValorantOrder.placementsOrder
      case 'unrated':
      return currentValorantOrder.unratedOrder
      case 'lesson':
        return currentValorantOrder.lessonOrder
      case 'live-game':
        return currentValorantOrder.liveGameOrder
      case 'play-together':
        return currentValorantOrder.playTogetherOrder
    }
  }
})

const paymentMethod = ref('stripe')

function selectPaymentMethod(newPaymentMethod) {
  paymentMethod.value = newPaymentMethod
}


function filterOptions(options) {
    let result = {};
    for (let key in options) {
        if (options[key] === true) {
            result[key] = true;
        }
    }
    return result;
}

async function createOrder() {
  order.value.options = filterOptions(order.value.options)

  await axios.post('/order', order.value)
}

</script>

<template lang="pug">
Banner(splashArtPath = 'gwen' title= 'COMPLETE PAYMENT' subtitle= 'Select your payment options below')
  .return(@click="router.back()") RETURN TO LAST PAGE
//- h1 {{ game }} {{  order }}
v-divider.border-opacity-100(thickness="1rem")
.complete-payment
  .account-and-payment
    .account-recipient
      .black-text SPECIFY THE ACCOUNT RECIPIENT
      .login-selects
        .login-select
          img.register-an-account(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/register-an-account.webp", alt="register-an-account")
          .grey-text REGISTER AN ACCOUNT
        .login-select
          img.continue-as-a-guest(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/continue-as-a-guest.webp", alt="continue-as-a-guest")
          .grey-text CONTINUE AS A GUEST
    .payment-method
      .black-text SELECT PAYMENT METHOD
      .payment-selects
        .payment-select(@click="selectPaymentMethod('stripe')" :class="paymentMethod == 'stripe' ? 'selected-payment-select' :  '' ")
          .checkbox
            svg.checkmark(v-if="paymentMethod == 'stripe'" xmlns='http://www.w3.org/2000/svg' width='33' height='32' viewbox='0 0 33 32' fill='none')
              path(d='M31.9688 4.62864L11.4616 27L2.0625 16.7465L4.47209 14.1178L11.4616 21.7241L29.5592 2L31.9688 4.62864Z' fill='#6262ED')
          img.stripe(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/stripe.webp")
        .payment-select(@click="selectPaymentMethod('coinbase')" :class="paymentMethod == 'coinbase' ? 'selected-payment-select' :  '' ")
          .checkbox
            svg.checkmark(v-if="paymentMethod == 'coinbase'" xmlns='http://www.w3.org/2000/svg' width='33' height='32' viewbox='0 0 33 32' fill='none')
              path(d='M31.9688 4.62864L11.4616 27L2.0625 16.7465L4.47209 14.1178L11.4616 21.7241L29.5592 2L31.9688 4.62864Z' fill='#6262ED')
          img.coinbase(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/coinbase.webp")
        .payment-select(@click="selectPaymentMethod('skrill')" :class="paymentMethod == 'skrill' ? 'selected-payment-select' :  '' ")
          .checkbox
            svg.checkmark(v-if="paymentMethod == 'skrill'" xmlns='http://www.w3.org/2000/svg' width='33' height='32' viewbox='0 0 33 32' fill='none')
              path(d='M31.9688 4.62864L11.4616 27L2.0625 16.7465L4.47209 14.1178L11.4616 21.7241L29.5592 2L31.9688 4.62864Z' fill='#6262ED')
          img.skrill(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/skrill.webp")
        .payment-select(@click="selectPaymentMethod('website-balance')" :class="paymentMethod == 'website-balance' ? 'selected-payment-select' :  '' ")
          .checkbox
            svg.checkmark(v-if="paymentMethod == 'website-balance'" xmlns='http://www.w3.org/2000/svg' width='33' height='32' viewbox='0 0 33 32' fill='none')
              path(d='M31.9688 4.62864L11.4616 27L2.0625 16.7465L4.47209 14.1178L11.4616 21.7241L29.5592 2L31.9688 4.62864Z' fill='#6262ED')
          .website-balance WEBSITE BALANCE
    img.figures(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/complete-payment-figures.webp")
  .order-summary
    div
      .black-text.summary-title ORDER SUMMARY
      .preview
        PreviewOrder(:order="order")
      .info
        OrderInformations(:order="order")
    .discount-and-proceed
      .discount
        .grey-text DISCOUNT CODE
        v-text-field()
      .proceed
        .total
          .total-price-text TOTAL PRICE
          .price
            | 730
            span.smalltext ,35
        v-btn(@click="createOrder").proceed-button PROCEED
</template>

<style scoped>
.v-divider {
  border-color: #181852 !important;
}
.complete-payment {
  max-width: 1440px;
  margin: 0 auto;
  padding: 3.7rem;
  display: flex;
  justify-content: space-between;
}
.return {
  color: #FFF;
  font-family: Inter;
  font-size: 24px;
  font-weight: 700;
  display: inline
}
/* box shadow */
.return:hover {
  cursor: pointer;
  text-shadow: 0 8px 4px rgba(0, 0, 0, 0.25);
}
.account-and-payment {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-family: Inter;
  gap: 65px;
}
.account-recipient  {

}
.black-text {
  color: #333;
  font-size: 32px;
  font-weight: 700;
}
.login-selects {
  display:flex;
  flex-direction: column;
  gap: 28px;
  padding-top: 41px;
}
.login-select {
  width: 416px;
  height: 67px;
  border-radius: 10px;
  border: 1px solid #DDD;
  background: #FFF;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  gap: 32px;
  padding: 1rem;
  cursor: pointer;
}
.login-select:hover {
  fill: #FFF;
  stroke-width: 1px;
  stroke: #6262ED;
  filter: drop-shadow(0px 0px 4px rgba(98, 98, 237, 0.25));
}
.register-an-account {
  height: 29px;
  width: 40px;
}
.continue-as-a-guest {
  height: 36px;
  width: 40px;
}
.grey-text {
  color: #777;
  font-size: 24px;
  font-weight: 700;
}
.payment-selects {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 61px;
}
.payment-select {
  width: 493px;
  height: 67px;
  border-radius: 10px;
  border: 1px solid #DDD;
  background: #FFF;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  padding-left: 20px;
  gap: 37px;
  cursor: pointer;
}
.payment-select:hover {
  box-shadow: 0 8px 4px rgba(0, 0, 0, 0.25);
}

.selected-payment-select {
  border: 1px solid #6262ED;
}
.checkbox {
  width: 25px;
  height: 25px;
  border: solid 1px #eee;
}
.checkmark {
  margin-top: -0.5rem;
}

.stripe {
  width: 81px;
  height: 34px;
}
.coinbase {
  width: 139;
  height: 30px;
}
.skrill {
  width: 93px;
  height: 32px;
}
.website-balance {
  color: #222;
  font-size: 24px;
  font-weight: 700;
}
.figures {
  width: 659px;
  height: 618px;
}
.order-summary {
  border: solid 1px #eee;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.summary-title {
  background-color: #eeeeee;
  width: 600px;
  padding: 1.5rem;
  border-radius: 10px;
}

.preview {
  border: solid 1px #eee;
  padding: 2rem;
  padding-bottom: 4rem;
}
.info {
  padding: 1.5rem;
}
.discount {
  padding: 54px;
  padding-bottom: 1rem;
}
.proceed {
  display:flex;
  align-items: center;
  justify-content: space-between;
  background-color: #eeeeee;
  padding: 1rem
}
.total-price-text {
  color: #B3B3B3;
  font-size: 20px;
  font-weight: 600;
}
.price {
  font-family: Inter;
  font-size: 64px;
  color: #202020;
  margin-top: -10px;
}
.price:after {
    content: '€';
    font-size:48px;
    position: relative;
    top: -12px;
}
.smalltext{
  font-family: Inter;
  font-size: 40px;
  font-weight: 500;
  color: #444;
}
.proceed-button {
  width: 264px;
  height: 70px;
}
</style>
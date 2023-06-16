<script setup>
import { computed  } from 'vue'
import { defineEmits } from 'vue';
import SelectLanes from '@/components/boosting/league-of-legends/SelectLanes'

const props = defineProps({
  checkoutTextColor: {
    type: String,
    required: true
  },
  game: {
    type: String,
    default: 'league-of-legends'
  }
})

const emit = defineEmits(['create-order'])

const createOrder = function(){
  emit('create-order')
}
const isGameLeagueOfLegends = computed(() => {
  return props.game == 'valorant' ? false : true
})

const gameName = computed(() => {
  return props.game == 'valorant' ? 'valorant' : 'league-of-legends'
})

</script>

<template lang="pug">
.checkout.elevation-4
  .text-checkout(v-bind:style="{color: checkoutTextColor}") CHECKOUT
  v-divider
  .first-slot.row-flex
    slot(name="switchs")
  SelectLanes.lanes(v-if="isGameLeagueOfLegends")
  .second-slot
    slot(name="options")
  .total-price-background
    .total-price-text TOTAL PRICE
    .discounted-price.without-discount 1204,40€
    .price-purchase-button
      .price
        | 730
        span.smalltext ,35
      .purchase-button.elevation-8(@click="createOrder()" v-bind:class="!isGameLeagueOfLegends ? 'valorant-button' : 'league-of-legends-button'")
        .logo
          v-img(:src="`../../src/assets/icons/${gameName}-money.png`")
        .purchase.text PURCHASE
  .custom-divider
  .receipt-and-barkod
    .receipt-text RECEIPT
    v-img(src='@/assets/barkod.png' width="11.5rem")
  .custom-divider
</template>

<style scoped>
.price:after {
    content: '€';
    font-size:48px;
    position: relative;
    top: -12px;
}
.row-flex {
  display:flex
}
.checkout {
  width: 33.75rem;
  font-family: Inter;
  padding: 1rem;
  border-left: 1px solid #C8AA6E;
  background-color: #FFFFFF;
}

.text-checkout {
  font-size: 48px;
  font-weight: 800;
  text-align: right;
}

.v-divider {
  padding: 0rem !important;
}

.first-slot {
  justify-content: end;
}

.second-slot {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.total-price-background {
  height: 8.75rem;
  background-color: #f4f1f0;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  margin: -1rem;
}

.total-price-text {
  font-family: Inter;
  font-size: 20px;
  font-weight: 600;
  color: #bababa;
  padding-top: 6px;
}

.discounted-price {
  position: relative;
  display: inline-block;
}

.discounted-price::after {
  content: "";
  position: absolute;
  top: 40%;
  left: 0;
  width: 85%;
  height: 3px;
  background: red;
  transform: rotate(-6deg);
}

.without-discount {
  font-family: Inter;
  font-size: 20px;
  font-weight: 500;
  color: #999999;
  margin: 0 auto;
  margin-top:-18px;
  padding-right: 1.25rem;
}

.price-purchase-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-family: Inter;
  font-size: 64px;
  color: #202020;
  margin-top: -10px;
}

.smalltext{
  font-family: Inter;
  font-size: 40px;
  font-weight: 500;
  color: #444;
}
.purchase-button {
  margin-top: -3rem;
  margin-right: -1rem;
  border-radius: 15px;
  width: 202px;
  height: 70px;
  flex-grow: 0;
  display:flex;
  gap:1rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  font-size: 20px;
  font-weight: bold;
  letter-spacing: normal;
}
.league-of-legends-button {
  background-color: #DDDDDD ;
  color: #444444;
}
.valorant-button {
  background-color: #444444;
  color: #DDDDDD;
}
.logo {
  width: 30px;
  height: 30px;
}
.purchase-icon {
  /* purchase-icon styles if needed */
}

.custom-divider {
  border-top: 3px dotted #bbb;
}

.receipt-and-barkod {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:  1rem 0rem;
}

.receipt-text {
  font-family: Brygada1918;
  font-size: 20px;
  font-weight: 600;
  color: #444;
}
</style>
<script setup>
import { computed  } from 'vue'
import { defineEmits } from 'vue';
import SelectLanes from '@/components/boosting/league-of-legends/SelectLanes'
import { calculatePrice } from '@/functions/calculation-league-of-legends-price'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'
import { useValorantOrder } from '@/store/valorant-order'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()
const currentValorantOrder = useValorantOrder()


const props = defineProps({
  checkoutTextColor: {
    type: String,
    required: true
  },
  game: {
    type: String,
    default: 'league-of-legends'
  },
  order: {
    type: Object,
    required: true
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

const price = computed(() => {
  return calculatePrice(props.order)
})

const priceTexts = computed(() => {
    return price.value.texts.map((item) => {
      if(item.amount == 'FREE') return {
        text: item.text,
        amount: 'FREE'
      }
      return {
        text: item.text,
        amount: item.amount.toFixed(2)
      }
    })
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
    .discounted-price.without-discount {{ (price.total * (130 / 100)).toFixed(2) }}
    .price-proceed-button
      .price
        | {{ price.total.toString().split('.')[0] }}
        span.smalltext ,{{ price.total.toFixed(2).toString().split('.')[1] }}
      v-btn.purchase-button.elevation-8(@click="createOrder()" v-bind:class="!isGameLeagueOfLegends ? 'valorant-button' : 'league-of-legends-button'")
        .purchase.text PROCEED
  .custom-divider
  .receipt-and-barkod
    .receipt-text RECEIPT
    img.barkod(src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/barkod.webp' alt='barkod')
  .custom-divider
    .items
      .item.first-item
        .first-item-text Item
        .first-item-amount Amount
      .item(v-for="item in priceTexts")
        .item-text {{item.text}}
        .item-amount {{ item.amount }}
  .custom-divider
  .item.last-row
    .item-text  IN TOTAL
    .item-amount {{ price.total.toFixed(2) }}€
</template>

<style scoped>
.items {
  height: 300px;
  display: flex;
  flex-direction: column;
  gap: 5px
}
.first-item-text {
  color: #444;
  font-family: Brygada 1918;
  font-size: 14px;
  font-weight: 500;
}
.first-item-amount {
  color: #444;
  font-family: Brygada 1918;
  font-size: 14px;
  font-weight: 500;
}
.first-item {
  margin-top: -1.8rem;
  margin-bottom: 0.8rem;
}
.item {
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
}
.item-text {
  color: #555;
  font-family: Brygada 1918;
  font-size: 14px;
  font-weight: 400;
}
.item-amount {
  color: #000;
  font-family: Brygada 1918;
  font-size: 14px;
  font-weight: 400;
}
.price {

  font-size: 64px;
  color: #202020;
  margin-top: -10px;
  padding-left: 2.2rem;
}
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
  gap: 1.5rem;
  padding-top: 1rem;
}

.total-price-background {
  height: 8.75rem;
  background-color: #f4f1f0;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  margin: 1.5rem -1rem 0.6rem -1rem;
}

.total-price-text {

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

  font-size: 20px;
  font-weight: 500;
  color: #999999;
  margin: 0 auto;
  margin-top:-18px;
  padding-right: 1.25rem;
}

.price-proceed-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.smalltext{

  font-size: 40px;
  font-weight: 500;
  color: #444;
}
.purchase-button {
  margin-top: -3rem;
  border-radius: 15px;
  width: 202px;
  height: 70px;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: normal;
}
.league-of-legends-button {
  background-color: #FFF ;
  color: #444;
}
.valorant-button {
  background-color: #444444;
  color: #DDDDDD;
}
.logo {
  width: 30px;
  height: 30px;
}
.custom-divider {
  border-top: 3px dotted #bbb;
  margin: 0rem -1rem;
}

.receipt-and-barkod {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:  1rem 0rem;
}
.barkod {
  width: 180px;
  height: 24px;
}

.receipt-text {
  font-family: Brygada1918;
  font-size: 20px;
  font-weight: 600;
  color: #444;
}
.last-row {
  padding: 0.5rem 0  0 0
}
</style>
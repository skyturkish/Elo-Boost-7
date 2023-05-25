<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['create-order']);


const createOrder = function(){
  emit('create-order');
}
// const props = defineProps({
//   appearIsSoloSwitch: {
//     type: Boolean,
//     required: true
//   },
//   appearLanes: {
//     type: Boolean,
//     required: true
//   },
//   total: {
//     type: Number,
//     required: true
//   },
//   items: {
//     type: Array,
//     required: true,
//   }
// })
</script>

<template lang="pug">
.checkout
  v-img(src='@/assets/checkout.png' width="33.81rem")
    .checkout-content
      .text-checkout CHECKOUT
      .solo-duo
        .solo SOLO
        v-switch(
          color='blue'
          inset)
        .duo DUO
      .lane-selection
      .order-options
        slot()
      .total-price
        .total-price-text TOTAL PRICE
        .discounted-price.without-discount 1204,40$
        .price-purchase-button
          .price
            | 730
            span.smalltext ,35
            span.euro €
          v-btn.purchase-button(
            height="70px"
            width="202px"
            elevation="5"
            size="x-large"
            color='#444'
            @click="createOrder()"
            )
            v-icon.purchase-icon(color="#f1f1f1" icon="mdi-cash-multiple")
            .purchase.text PURCHASE
      .receipt
        .text-recepit RECEIPT
      .receipt-items
        .item-titles
          .item-title Item
          .item-ID ID
          .item-amount Amount
        .items
          .item
            .item-title Eloboosting Service
            .item-ID Bronze I・Immortal III
            .item-amount 541,00€
      .discount-code-text Discount Code:
      .in-total
        .in-total-text IN TOTAL
        .in-total-price  730,35€
</template>

<style scoped>
.checkout {
  width: 33.81rem;
  margin: 0 auto
}
.checkout-content {
  padding: 1rem;
}
.text-checkout {
  font-family: Inter;
  font-size: 48px;
  font-weight: 800;
  text-align: end;
  color: #2b2d3d;
}
.solo-duo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: end;
  height: 5.1rem;

}
.solo,
.duo {
  font-family: Inter;
  font-size: 20px;
  font-weight: 600;
  color: #444;
}
.lane-selection {
  height: 4.1rem;
}
.order-options {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 21.7rem;
}
.total-price {
  display:flex;
  flex-direction: column;
  padding: 0.5rem;
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

.discounted-price span {
  position: relative;
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
  padding-right: 1.25rem
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
.euro {
  margin-top: -4px;
}
.purchase-button {
  margin-top: -3rem;
  border-radius: 15px;
}
.purchase.text {
  font-family: Inter;
  font-size: 20px;
  letter-spacing: normal;
  font-weight: 600;
  margin: 0px 0px 0px 16px;
  color: #ddd;
}
.receipt {
  padding-top: 1.8rem;
  padding-right: 0.5rem;
}
.text-recepit {
  font-family: Brygada1918;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  color: #444;
  padding-left: 2.5rem;
}
.item-titles {
  padding-top: 2.60rem;
  display: flex;
  justify-content: space-between;
}
.item-titles > * {
  font-family: Brygada1918;
  font-size: 14px;
  color: #444;
}
.item-title,
.item-ID,
.item-amount  {
  font-family: Brygada1918;
  font-size: 14px;
  color: #555;
}
.item-amount {
  color: #000;
}
.items {
  padding-top: 1rem;
  height: 21rem;
}
.item {
  display: flex;
  justify-content: space-between;
}
.discount-code-text {
  font-family: Brygada1918;
  font-size: 14px;
  font-weight: 600;
  color: #444;
}
.in-total {
  padding-top: 3rem;
  display: flex;
  justify-content: space-between;
}
.in-total-text,
.in-total-price {
  font-family: Brygada1918;
  font-size: 14px;
  color: #555;
}
.in-total-price {
  color: #000;
}



.v-switch.v-input {
  flex: 0 auto
}
.v-switch.v-input--horizontal {
  grid-template-areas: 'reset'
}
.v-select.v-input--horizontal{
  grid-template-areas: 'reset';
}
.v-select > .v-input__control > .v-field{
  font-size: 8px;
}
</style>
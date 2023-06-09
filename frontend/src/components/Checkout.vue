<script setup>
import { defineEmits } from 'vue';
import SelectLanes from '@/components/boosting/league-of-legends/SelectLanes'

const props = defineProps({
  checkoutTextColor: {
    type: String,
    required: true
  },
  isLanesExist: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['create-order']);

const createOrder = function(){
  emit('create-order');
}

</script>

<template lang="pug">
.checkout.elevation-4
  .text-checkout(v-bind:style="{color: checkoutTextColor}") CHECKOUT
  v-divider
  .first-slot.row-flex
    slot(name="switchs")
  SelectLanes.lanes(v-if="isLanesExist")
  .second-slot
    slot(name="options")
  .total-price-background
    .total-price-text TOTAL PRICE
    .discounted-price.without-discount 1204,40€
    .price-purchase-button
      .price
        | 730
        span.smalltext ,35
        span.euro €
      v-btn.purchase-button(height="70px" width="202px" elevation="5" size="x-large" color='#444' @click="createOrder()")
        v-icon.purchase-icon(color="#f1f1f1" icon="mdi-cash-multiple")
        .purchase.text PURCHASE
  .custom-divider
  .receipt-and-barkod
    .receipt-text RECEIPT
    v-img(src='@/assets/barkod.png' width="11.5rem")
  .custom-divider
</template>

<style scoped>

.row-flex {
  display:flex
}
.checkout {
  width: 33.75rem;
  font-family: Inter;
  padding: 1rem;
  border-left: 1px solid #C8AA6E;
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
}

.total-price-background {
  height: 8.75rem;
  background-color: #f4f1f0;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
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

.euro {
  margin-top: -4px;
}

.purchase-button {
  margin-top: -3rem;
  border-radius: 15px;
}

.purchase-icon {
  /* purchase-icon styles if needed */
}

.purchase.text {
  font-family: Inter;
  font-size: 20px;
  letter-spacing: normal;
  font-weight: 600;
  margin: 0px 0px 0px 16px;
  color: #ddd;
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
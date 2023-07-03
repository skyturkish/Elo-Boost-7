<script setup>
import { computed } from 'vue'

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

const orderInformations = computed(() => {
  if (props.order == null) return null

  const informations = {
    'TYPE': props.order.orderType,
    'CURRENT DIVISION': `${props.order.currentRank.division} ${props.order.currentRank.milestone} (${props.order.currentRank.currentLP})`,
    'DESIRED DIVISIOIN': !props.order.desiredRank ? null :`${props.order.desiredRank.division} ${props.order.desiredRank.milestone}`,
    'QUEUE': props.order.queue,
    'SERVER': props.order.server,
    'BONUS WIN': props.order.bonusWin ? 'TRUE' : 'FALSE',
    'DUO':  props.order.isSolo ? 'TRUE' : 'FALSE',
    'SOLO ONLY': props.order.isSolo ? 'TRUE' : 'FALSE',
    'PREMIUM': props.order.premium ? 'TRUE' : 'FALSE',
    'FLASH': props.order.flash,
  }

  return Object.fromEntries(
        Object.entries(informations).filter(([key, value]) => value != null)
    );
})

</script>

<template lang="pug">
div.default-height
  .order-informations(v-for="(a,b) in orderInformations")
    .information-row
      .normal-black-text {{ b }}
      .grey-text {{ a }}
</template>

<style scoped>
.default-height {
  min-height: 400px;
}
.information-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.normal-black-text {
  font-size: 20px;
  font-weight: 600;
  color: #222;
}
.grey-text {
  font-size: 20px;
  font-weight: 600;
  color: #bbb;
}
</style>

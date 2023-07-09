<script setup>
import AppBar from '@/components/Appbar'

const props = defineProps({
  toolTipText: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
})

</script>

<template lang="pug">
.checkout-selection
  .row
    .empty
    .title {{ title }}
    .empty
  .slot
    slot()
</template>

<style scoped>
.checkout-selection {
  width: 218px;
  height: 100px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.question-mark {
  width: 1.2rem;
  height: 1.2rem;
}
.title {
  font-size: 20px;
  font-weight: 600;
  color: #1B1A1A;
}
.empty {
  width: 24px;
}
.slot {
  align-self: center;
  display:flex;
  align-items: center;
}
</style>
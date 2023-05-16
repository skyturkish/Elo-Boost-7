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
    v-tooltip(location="left" :text='toolTipText' )
      template(v-slot:activator='{ props }')
        v-icon(v-bind='props' icon="mdi-help-circle")
    .title {{ title }}
    .empty
  .slot
    slot()
</template>

<style scoped>
.checkout-selection {
  width: 250px;
  display: flex;
  flex-direction: column;
  font-family: Inter;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  font-size: 24px;
  font-weight: 600;
  color: #000;
}
.empty {
  width: 24px;
}
.slot {
  align-self: center;
}
</style>
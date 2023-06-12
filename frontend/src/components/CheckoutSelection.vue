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
        .question-mark
          v-img(src="@/assets/icons/question-mark.png" v-bind='props')
    .title {{ title }}
    .empty
  .slot
    slot()
</template>

<style scoped>
.checkout-selection {
  width: 250px;
  height: 100px;
  display: flex;
  flex-direction: column;
  font-family: Inter;
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
  gap: 1rem
}
</style>
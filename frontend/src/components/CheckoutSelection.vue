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
  div.row
    v-tooltip(location="left" :text='toolTipText' )
      template(v-slot:activator='{ props }')
        img.question-mark(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/question-mark.webp" v-bind='props' alt="question-mark")
    .title {{ title }}
  .slot
    slot()
</template>

<style scoped>
.checkout-selection {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 28px;
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
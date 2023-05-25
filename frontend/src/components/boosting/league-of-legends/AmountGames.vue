<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  selectedValue: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
})

const currentValue = ref(props.selectedValue)

const emit = defineEmits(['update:selectedValue'])

const updateSelectedValue = (value) => {
  currentValue.value = value
  emit('update:selectedValue', value)
}
</script>

<template lang="pug">
.amount-games
  .hours-of-lesson {{ title }}
  v-select(:items=items v-model="currentValue" @update:modelValue="updateSelectedValue")
</template>

<style scoped>
.hours-of-lesson {
  font-family: Inter;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: normal;
  color: #444;
  text-align: center;
  padding-bottom: 1rem;
}
</style>

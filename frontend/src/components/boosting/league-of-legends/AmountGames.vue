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
  v-select(:items="['1 HOURS', '2 HOURS', '3 HOURS', '4 HOURS', '5 HOURS']" v-model="currentValue" @update:modelValue="updateSelectedValue")
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

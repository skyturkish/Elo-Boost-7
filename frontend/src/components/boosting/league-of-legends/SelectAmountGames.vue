<script setup>
// bu değeri değiştireceksin, listen bu, bu da default değerin diye bir ayar yapılacak buraya tüm değerler de store'da tutulacak.
import { ref, defineProps, defineEmits } from 'vue'
import { useLeagueOfLegendsOrder } from '@/store/league-of-legends-order'

const currentLeagueOfLegendsOrder = useLeagueOfLegendsOrder()
const props = defineProps({
  selectedValue: {
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
v-select(:items="['1 HOURS', '2 HOURS', '3 HOURS', '4 HOURS', '5 HOURS']" v-model="currentValue" @update:modelValue="updateSelectedValue" variant="outlined")
  template(v-slot:selection='{ item, index }')
    h5(:style="{color: currentLeagueOfLegendsOrder.colors.dominantColor}") {{ item.title }}
</template>

<style scoped>
</style>

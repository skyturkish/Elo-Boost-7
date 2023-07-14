<script setup>
import { ref } from 'vue'
const dialog = ref(false)

const props = defineProps(['modelValue'])
const emits = defineEmits(['call-help', 'update:modelValue'])

const validationRules = {
      "note":  [
        value => {
          if (value) return true

          return 'You can use keywords'
        },
        value => {
          if (value?.length > 4) return true

          return 'Note must be at least 5 characters.'
        },
        value => {
          if (value?.length < 100) return true

          return 'Note must be less than 100 characters.'
        },
      ],
}

const callHelp = function(){
  emits('call-help')
}
</script>

<template lang="pug">
v-dialog(v-model="dialog"  width="auto")
  template(v-slot:activator="{ props }")
    .need-help.row.center-child(@click="dialog = true")
        img.need-help-icon(src='https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/need-help.webp' alt="need-help")
        h3.black-text NEED HELP
  v-card
    h4 Can you briefly summarize the issue you want help with?
    v-textarea(:rules="validationRules.note" :value="modelValue" :counter="100" rows="1" max-rows="3" @input="$emit('update:modelValue', $event.target.value)")
    v-btn(@click="callHelp()") CALL HELP

</template>

<style scoped>
.v-card {
  padding: 2rem;
}
.need-help {
  width: 200px;
  height: 50px;
  border-radius: 5px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  border: solid 1px #eee;
  background-color: #fff;
  justify-content: space-around;
  margin-left:25px;
  cursor: pointer;
}
.need-help-icon {
  height: 30px;
  width: 30px;
}
.row {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.center-child {
  display: flex;
  justify-content: center;
  align-items: center;
}
.need-help:hover {
  transform: rotateY(10deg) rotateX(10deg) scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
</style>

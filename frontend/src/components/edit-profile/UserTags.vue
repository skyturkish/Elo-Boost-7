<script setup>
import { computed } from 'vue'
import { useAccount } from '@/store/account'

const useAccountStore = useAccount()

const colors = {
  'divine-booster': {
    backgroundColor: '#eee5ff',
    color: '#bba2da'
  },
  'elite-booster': {
    backgroundColor: '#eee5ff',
    color: '#bba2da'
  },
  'divine-coach': {
    backgroundColor: '#eee5ff',
    color: '#bba2da'
  },
  'elite-coach': {
    backgroundColor: '#eee5ff',
    color: '#bba2da'
  },
  'league-of-legends': {
    backgroundColor: '#e5f3ff',
    color: '#a2c0da'
  },
  'valorant': {
    backgroundColor: '#ffe2e2',
    color: '#f09b9b'
  },
}

</script>

<template lang="pug">
.tags-title.center-child TAGS
.tags
  .tag.center-child(v-for="tag in useAccountStore.userTags" :style="colors[tag]") {{ tag.split('-').join(' ').toUpperCase() }}
</template>

<style scoped>
.tags-title,
.tag {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.tags-title {
  width: 333px;
  height: 55px;
  background-color: #ddd;
  font-size: 32px;
  font-weight: bold;
  color: #fff;

}
.tags {
  width: 333px;
  gap: 1.2rem;
  padding-top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.tag {
  width: 250px;
  height: 40px;
  border-radius: 4px;
  font-size: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>

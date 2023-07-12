<script setup>
import { onMounted } from 'vue'
import Footer from '@/components/Footer'

onMounted(async () => {
  window.addEventListener('beforeunload', () => {
    useAccountStore.changeUserOnlineState('offline')
  });
})
</script>

<template lang="pug">
router-view
Footer
</template>

<style>
body {
  font-family: 'Inter', sans-serif;
}

.v-btn--active > .v-btn__overlay, .v-btn[aria-haspopup=menu][aria-expanded=true] > .v-btn__overlay {
   opacity: 0.01 !important;
}
.custom-switch-two-options {
  display:flex;
  align-items: center;

  gap: 0.5rem;
  padding: 1rem 2rem 0 2rem;
  justify-content: end;
}
.custom-switch-two-options > .choice {
  font-size: 20px;
  font-weight: 600;
  color: #444;
  user-select: none;
}
</style>
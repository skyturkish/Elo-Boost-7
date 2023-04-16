<script setup>
import { ref} from 'vue'

import { useAccount } from '@/store/account'

import AuthMenu from '@/components/menus/AuthMenu'
import AuthDialog from '@/components/dialogs/AuthDialog'

const useAccountStore = useAccount()

const dialog = ref(false)

function closeDialog() {
  dialog.value = false
}

</script>

<template lang="pug">
v-btn.client-area(rounded="lg" variant="tonal")
  AuthMenu(v-if="useAccountStore.user")
  .client-area-text(v-else) Client Area
    v-dialog.dialog(
      v-model='dialog'
      persistent
      activator='parent'
      width="1024"
      color="primary"
      overlay-color="black"
    )
      AuthDialog(
        v-on:close-dialog="closeDialog"
      )
</template>

<style scoped>
.client-area {
    margin-right: 1rem;
    height: 3.5rem;
    border-radius: 1rem;
    box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.5);
    background-color: #174e82;
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: normal;
}
.client-area-text {
  color: #fff;
}

</style>

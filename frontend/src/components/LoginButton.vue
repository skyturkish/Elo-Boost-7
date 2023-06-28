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
AuthMenu(v-if="useAccountStore.user")
v-btn.client-area(v-else) Login
  v-dialog.dialog(v-model='dialog' activator='parent' width="1024" color="primary" overlay-color="black")
    AuthDialog(v-on:close-dialog="closeDialog")
</template>

<style scoped>
.client-area {
  width: 135px;
  height: 50px;
  border-radius: 15px;
  box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.5);
  background-color: #174e82;


  font-family: Inter;
  font-size: 24px;
  font-weight: 800;
  color: #fff;
  letter-spacing: normal;
}
</style>
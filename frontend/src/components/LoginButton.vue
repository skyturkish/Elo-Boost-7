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
img.login-button(v-else src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/login-button.webp" )
v-dialog.dialog(v-model='dialog' activator='parent' width="1024" color="primary" overlay-color="black")
  AuthDialog(v-on:close-dialog="closeDialog")
</template>

<style scoped>
.login-button {
  width: 140px;
  height: 50px;
  cursor: pointer;
}

.login-button:hover {
  transform: scale(1.05);
  transition: transform 0.5s;
}
</style>
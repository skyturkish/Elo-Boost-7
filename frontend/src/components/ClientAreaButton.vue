<script setup>
import { useAccount } from '@/store/account'

import AuthMenu from '@/components/menus/AuthMenu'
import AuthDialog from '@/components/dialogs/AuthDialog'

const useAccountStore = useAccount()

</script>

<template lang="pug">
v-btn.client-area(rounded="lg" variant="tonal")
  .client-area-text Client Area
  AuthMenu(v-if="useAccountStore.user")
  AuthDialog(v-else)
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

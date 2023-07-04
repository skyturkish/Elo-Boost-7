<script setup>
import { useAccount } from '@/store/account'
import { ref } from 'vue'

const useAccountStore = useAccount()
const avatarDialog = ref(false)

</script>

<template lang="pug">
.profile
  .background-avatar(:style="{ backgroundImage: `url(${useAccountStore.user.photo})`}")
    .text CHANGE AVATAR
  v-dialog(v-model='avatarDialog' activator='parent' width='auto')
    v-card.row
      h1 this is avatar
</template>

<style scoped>
.background-avatar {
  border-radius: 15px;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  width: 177px;
  padding-top: 75px;
  padding-bottom: 75px;
  border: solid 1px #905939;
  text-shadow: 0 0 10px #000;
  background-size: cover;
  display:flex;
  justify-content: center;
}
</style>

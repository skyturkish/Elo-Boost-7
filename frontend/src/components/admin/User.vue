<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const userId = route.params.userId
const user = ref(null)

onMounted(() => {
  axios.get(`user/${userId}`).then(res => {
    user.value = JSON.stringify(res.data, null, 2);
  })
})

async function editInformations() {
  const jsonUserInformations = JSON.parse(user.value)

  await axios.patch(`/user/${userId}`, jsonUserInformations)
}
</script>

<template lang="pug">
.arrow.center-child(@click="router.go(-1)")
  v-icon(icon="mdi-arrow-left-thick" size="50px")
.user(v-if="user != null")
  textarea.text-area(v-model="user")
  v-btn.edit-information(@click="editInformations") Edit Informations
</template>

<style scoped>
.text-area {
  height: 800px;
}
.user {
  display: flex;
  flex-direction: column;
  padding: 3rem;
  width: 1280px;
}
</style>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

</script>

<template lang="pug">
v-btn.purchaseEloboosting.rounded-xl(
    variant="tonal"
    @click="router.push('/boosting/league-of-legends/division')"
)
    .text PURCHASE <br> ELOBOOSTİNG
</template>

<style scoped>

.purchaseEloboosting {
    width: 231px;
    height: 93px;
    background-color: #174e82;
}

.text {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: normal;
  color: #fff;
}
</style>

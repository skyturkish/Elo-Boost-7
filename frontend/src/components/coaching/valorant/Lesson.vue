<script setup>
import CurrentRank from '@/components/coaching/valorant/CurrentRank.vue'
import Checkout from '@/components/Checkout.vue'
import SelectLanguages from '@/components/coaching/valorant/SelectLanguages.vue'
import SelectHours from '@/components/coaching/valorant/SelectHours.vue'
import SelectCoach from '@/components/coaching/valorant/SelectCoach'
import SelectAgents from '@/components/boosting/valorant/SelectAgents'
import Premium from '@/components/boosting/valorant/Premium'
import { useRouter } from 'vue-router'

const router = useRouter()

async function createOrder() {
  router.push({
    path: `/complete-payment/valorant/lesson`,
  })
}
</script>

<template lang="pug">
CurrentRank
  SelectLanguages
  SelectHours
Checkout(checkoutTextColor="#280000" game="valorant" v-on:create-order="createOrder")
  template(v-slot:options)
    SelectCoach
    SelectAgents
    Premium
</template>

<style scoped>

</style>

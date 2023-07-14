<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const reports = ref([])

onMounted(() => {
  axios.get('/report').then(res => {
    reports.value = res.data
    console.log(res.data)
  })
})
</script>

<template lang="pug">
h1 Reports
  v-card(v-if="reports" v-for="report in reports" width="200" :title="report.type" :subtitle="report.state" :text="report.note" :key="report._id" variant="outlined")
   v-card-actions
      v-btn(variant='outlined' @click="router.push(`/panel/own-order-detail/${report.order}`)")
        | Go To Order
</template>

<style scoped>

</style>
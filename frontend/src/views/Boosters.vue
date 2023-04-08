<script setup>
import { ref, onMounted } from 'vue'

import axios from 'axios'

const boosters = ref({})

async function getAllBoosters()  {
    const AllBoosters =  await axios.get('/user/role/booster')
    boosters.value = AllBoosters

}

onMounted( async () =>  {
    await getAllBoosters()
    console.log(`All Booster have been taken.`)
})
</script>

<template lang="pug">
.boosters
  v-card.booster(v-for='booster in boosters.data' :key='booster' max-width='344' variant='outlined')
    v-card-item
      div
        .text-overline.mb-1
          | {{booster.name}}
        .text-h6.mb-1
          | {{booster.mainGame}}
    v-card-actions
      v-btn(variant='outlined' :to='`/boosters/${booster._id}`')
        | More Detail
</template>

<style scoped>
.boosters {
    display: grid;
    grid-template-columns: repeat(5,1fr);
}

</style>

<script setup>
import { ref, onMounted } from 'vue'

import axios from 'axios'

const boosters = ref({})

async function getAllBoosters()  {
    const AllBoosters =  await axios.get('/booster')
    boosters.value = AllBoosters

}

onMounted( async () =>  {
    await getAllBoosters()
    console.log(`All Booster have been taken.`)
})

</script>
<template>
    <body>
        <div 
        class="boosters"
        > 
            <v-card
            v-for="booster in boosters.data" 
            :key="booster"
            class="booster"
            max-width="344"
            variant="outlined"
            >
                <v-card-item>
                <div>
                <div class="text-overline mb-1">
                {{booster.name}}
                </div>
                <div class="text-h6 mb-1">
                {{booster.mainGame}}
                </div>
                </div>
                </v-card-item>
                <v-card-actions>
                <v-btn 
                variant="outlined"
                :to="`/boosters/${booster._id}`"
                >
                More Detail
                </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </body>
</template>

<style scoped>

.boosters {
    display: grid;
    grid-template-columns: repeat(5,1fr);
}

</style>


<script setup>
import { useCurrentOrder } from '@/store/currentOrder'

const CurrentOrderStore = useCurrentOrder()

const divisions =  [
  { 
    rank: 1,
    name: 'Iron',
  },
  { 
    rank: 2,
    name: 'Bronze',
  },
  { 
    rank: 3 ,
    name: 'Silver',
  },
  { 
    rank: 4,
    name: 'Gold',
  },
 { 
    rank: 5,
    name: 'Platinum',
  },
   { 
    rank: 6,
    name: 'Diamond',
  },
 { 
    rank: 7,
    name: 'Master',
  },
 { 
    rank: 8,
    name: 'GrandMaster',
  },
 { 
    rank: 9,
    name: 'Challenger',
  },
]

const imgUrls = import.meta.glob('../../../../assets/divisions/leagueOfLegends/*.png', {
  import: 'default',
  eager: true
})

</script>

<template>
    <div class="divisions">
        <img  v-for="division in divisions" 
        :key="division.name" 
        :src="imgUrls[`../../../../assets/divisions/leagueOfLegends/Season_2022_${division.name}.png`]" 
        :alt=division.name 
        @click="CurrentOrderStore.changeDivision(division.name)">
    </div>
</template>

<style scoped>

img {
  width: 4vw;
}
.divisions{
  display: flex;
  gap: 1rem;
}

@media (max-width: 70em){
  img {
    width: 8.5vw;
  }
}

</style>
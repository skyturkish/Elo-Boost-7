<script setup>
import { ref } from 'vue'

import axios from 'axios'

import Divisions from '@/components/order/leagueOfLegends/sub-components/DivisionsImages'
import MileStones from '@/components/order/leagueOfLegends/sub-components/DivisionMileStones'
import SelectServer from '@/components/order/leagueOfLegends/sub-components/SelectServer'
import SelectQueueType from '@/components/order/leagueOfLegends/sub-components/SelectQueueType'
import SelectCurrentLP from '@/components/order/leagueOfLegends/sub-components/SelectCurrentLP'
import SelectGainLP from '@/components/order/leagueOfLegends/sub-components/SelectGainLP'

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

const options = [
  {
    label:'Appear Offline On Chat',
    price: 'FREE',
    isActive: false
  },
  {
    label:'Priority Order',
    price: '20%',
    isActive: false
  },
  {
    label:'Stream Games',
    price: '15%',
    isActive: false
  },
  {
    label:'+1 Bonus Win',
    price: '10%',
    isActive: false
  },
]

function changeState(option){
  option.isActive = !option.isActive
  console.log(option.isActive)

}

const destinationDivision = ref(divisions[5])
const destinationDivisionMileStone = ref('I')

const divisionMileStones= [ 'I', 'II' ,'III', 'IV']

function changeDestinationDivision(newDivision) {
  destinationDivision.value = newDivision
}

function changeDestinationMileStone(newMileStone) {
  destinationDivisionMileStone.value = newMileStone
}

const imgUrls = import.meta.glob('../../../../assets/divisions/leagueOfLegends/*.png', {
  import: 'default',
  eager: true
})
</script>

<template>
    <body>
      <div class="currentRank">
        <div class="title">
          <img 
            :src="imgUrls[`../../../../assets/divisions/leagueOfLegends/Season_2022_${CurrentOrderStore.division}.png`]" 
            :alt="CurrentOrderStore.division" >
          <div class="title-text">
            <h1>Current Rank</h1>
            <h3>Please select your Current Rank and Division</h3>
          </div>
        </div>
        <div class="selectDivision">
            <Divisions/>
            <MileStones/>
        </div>
        <div class="selectLP">
          <SelectCurrentLP/>
          <SelectGainLP/>
        </div>
      </div>
      <div class="destinationRank"> 
        <div class="title">
          <img 
          :src="imgUrls[`../../../../assets/divisions/leagueOfLegends/Season_2022_${destinationDivision.name}.png`]" 
          :alt="destinationDivision.name" >
          <div class="title-text">
            <h1>Destination Rank</h1>
            <h3>Please select destination Current Rank and Division</h3>
          </div>
        </div>
        <div class="selectDivision">
          <div class="divisions">
            <img  
            v-for="division in divisions" 
            :key="division.name" 
            :src="imgUrls[`../../../../assets/divisions/leagueOfLegends/Season_2022_${division.name}.png`]" 
            :alt=division.name
            @click="changeDestinationDivision(division)">
          </div>
          <div class="divisionMileStones">
            <v-btn v-for="milestone in divisionMileStones" :key="milestone" variant="tonal" @click="changeDestinationMileStone(milestone)">{{ milestone }}</v-btn>
          </div>
        </div>
        <div class="selectLP">
          <SelectServer/>
          <SelectQueueType/>
        </div>
      </div>
      <div class="checkout">
        <h1>Checkout</h1>
        <div class="toRank">
          <div class="rank">
            <img 
            :src="imgUrls[`../../../../assets/divisions/leagueOfLegends/Season_2022_${CurrentOrderStore.division}.png`]" 
            :alt="CurrentOrderStore.division" >
            <div>{{ CurrentOrderStore.division }} {{ CurrentOrderStore.mileStone }}</div>
          </div>
          <div>
            ----->
          </div>
          <div class="rank">
            <img 
            :src="imgUrls[`../../../../assets/divisions/leagueOfLegends/Season_2022_${destinationDivision.name}.png`]" 
            :alt="destinationDivision.name" >              
              <div>{{ destinationDivision.name }} {{ destinationDivisionMileStone }}</div>
          </div> 
        </div>
        <div>Trustpilot ❤❤❤❤❤ 4.9</div>
        <v-divider></v-divider>
        <div class="options">
          <div class="option" v-for="option in options" :key="option.label">
            <v-switch 
            class="px-10 bg-secondary rounded-pill"
            color="success"
            @click=changeState(option)
            :v-model=option.isActive
            :label=option.label
            ></v-switch>
          </div>
        </div>
        <div class="totalAmount">
          <h1>Total amount: </h1>
          <h1>15 $</h1>
        </div>
        <v-btn
        color="red"
        @click="CurrentOrderStore.createOrder({boostType: 'divisions', options: options, desiredRank: {
          desiredDivision: destinationDivision.name,
          desiredMileStone: destinationDivisionMileStone
        }})"
        >Pay Now</v-btn>
        <h3>Approximate completion time: 0-1 days</h3>
      </div>
    </body>
</template>

<style scoped>

img {
  width: 4vw;
}

body {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  padding-block: 2rem;
  width: 100%;
  margin-inline: auto;
  grid-template-areas: 
    'currentRank currentRank currentRank checkout checkout'
    'currentRank currentRank currentRank checkout checkout'
    'destinationRank destinationRank destinationRank checkout checkout'
    'destinationRank destinationRank destinationRank checkout checkout';
}

.currentRank,
.destinationRank {
  padding: 1rem;
  background-color: grey;
  gap: 1rem ;
  display:flex;
  flex-direction: column;
  grid-area: currentRank; 
  justify-content: space-around;
}
.title {
  display:flex;
  gap: 1rem;
  align-items: center;
}
.title-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.selectDivision {
  display:flex;
  flex-direction: column;
  align-items: start;
  gap: 1.5rem;
}
.divisions{
  display: flex;
  gap: 1rem;
}
.selectLP {
  display:flex;
  gap: 2rem;
}
.divisionMileStones {
  display: flex;
  gap: 1rem;
}
.destinationRank {
  background-color: rgb(194, 175, 175);
  grid-area: destinationRank;
}
.checkout {
  grid-area: checkout;
  background-color: rgb(154, 154, 181);
  padding: 1.5rem;
  display:flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-around;
}
.toRank {
  gap: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

}
.options {
  display :grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.totalAmount {
  display:flex;
  justify-content: space-between;
}
@media (max-width: 70em){
  img {
    width: 8.5vw;
  }
  body {
    grid-template-areas: 
    'currentRank'
    'destinationRank'
    'checkout';
  }
}
</style>

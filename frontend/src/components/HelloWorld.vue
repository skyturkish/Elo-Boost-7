<script setup>
import { ref } from 'vue'

// TODO can make more dynamic
import iron from '../assets/divisions/Season_2022_Iron.png'
import bronze from '../assets/divisions/Season_2022_Bronze.png'
import silver from '../assets/divisions/Season_2022_Silver.png'
import gold from '../assets/divisions/Season_2022_Gold.png'
import platinum from '../assets/divisions/Season_2022_Platinum.png'
import diamond from '../assets/divisions/Season_2022_Diamond.png'
import master from '../assets/divisions/Season_2022_Master.png'
import grandMaster from '../assets/divisions/Season_2022_GrandMaster.png'
import challenger from '../assets/divisions/Season_2022_Challenger.png'

const divisions = [iron,bronze,silver,gold,platinum,diamond,master,grandMaster,challenger]

</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-container class="bg-surface-variant">
    <v-row no-gutters>
      <v-col cols="8">
        <v-sheet class="pa-2">
          .v-col-12
        </v-sheet>
      </v-col>
      <v-col cols="6">
        <v-sheet class="pa-2">
          .v-col-6
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
      
      <!-- <div class="columns">
        <div class="first-column">
        <img :src="iron" height="200" />
        <img :src="bronze" height="200"/>
      </div>
      <div class="second-column">
        <img :src="silver" height="400" />
      </div>
      </div>      -->
    </v-responsive>
  </v-container>
</template>

<style scoped>
.columns {
  display: grid;
  grid-auto-flow: row;
}


/* şey gibi galiba ? bu olursa alttakini kullan gibi */
/* @media'yı araştır */
@media (min-width: 55em) {
  .columns {
    grid-auto-flow: column;
  }
}

.first-column {
  display: grid;
  grid-template-rows: 50% 50%;
}

/* .first-column {
  display: grid;
  grid-template-rows: 50% 50%;

  bak burada şey oluyor 3 tane varsa eşit paylaştırıyor, 2 tane varsa kalanlar onlarla eşit paylaştırıp column haline getiriliyor otomatik
  grid-auto-flow: column;
} */
</style>


<!-- <template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-img
        contain
        height="300"
        src="@/assets/logo.svg"
      />

      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h2 font-weight-bold">Vuetify</h1>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            href="https://next.vuetifyjs.com/components/all/"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon
              icon="mdi-view-dashboard"
              size="large"
              start
            />

            Components
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            color="primary"
            href="https://next.vuetifyjs.com/introduction/why-vuetify/#feature-guides"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            target="_blank"
            variant="flat"
          >
            <v-icon
              icon="mdi-speedometer"
              size="large"
              start
            />

            Get Started
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            href="https://community.vuetifyjs.com/"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon
              icon="mdi-account-group"
              size="large"
              start
            />

            Community
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template> -->
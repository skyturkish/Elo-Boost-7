<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-6" />
      D891U Boost
    </v-app-bar-title>
    <template v-slot:append>
    <div class="links">
      <router-link to="/">Main </router-link>
      <router-link to="/orders">Orders</router-link>
      <router-link to="/boosting">Boosting </router-link>
      <router-link to="/customers">Customers </router-link>
      <router-link to="/boosters">Boosters </router-link>
    </div>
  </template>
  </v-app-bar>
</template>

<style scoped>
.links {
  display: flex;
  gap: 1.5rem;
}
</style>

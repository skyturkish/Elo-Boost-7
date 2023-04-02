<script setup>
import AppBar from '@/components/main/AppBar'
import Games from '@/components/main/Games'
import OurFeatures from '@/components/main/OurFeatures'
import Boosting from '@/components/main/Boosting'
import Coaching from '@/components/main/Coaching'
import Shop from '@/components/main/Shop'
import Hub from '@/components/main/Hub'
</script>

<template lang="pug">
.body
    AppBar()
    Games()
    OurFeatures()
    Boosting()
    Coaching()
    Shop()
    Hub()

</template>

<style scoped>

</style>

<script setup>
const games = [
    'LeagueOfLegends',
    'Valorant',
    'TeamFightTactics',
    'LeagueOfLegendsWildRift',
]

const imgUrls = import.meta.glob('../../assets/games/splashScreens/*.png', {
  import: 'default',
  eager: true
})

const services = [
    'ELOBOOST',
    'COACHING',
    'SHOP',
    'HUB',
]

</script>

<template lang="pug">
.games
    v-img.game(
        v-for="game in games"
        :key="game"
        :alt=game
        aspect-ratio='5/3'
        cover=''
        :src="imgUrls[`../../assets/games/splashScreens/${game}SplashScreen.png`]")
        .services
            v-btn.service(
                v-for="service in services"
            ) {{ service }}
</template>

<style scoped>
.games {
    display: flex;
}

.game {
    background-color: purple;
    display: flex;
    justify-content: space-between;
}
.services {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.service {
    height: 25%;
    opacity: 0.3;
}
</style>

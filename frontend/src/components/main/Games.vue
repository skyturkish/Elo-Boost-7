<script setup>
const games = ['league-of-legends','valorant']

const services = [
  {
    name: 'ELOBOOST',
    path: '/boosting'
  },
  {
    name: 'COACHING',
    path: '/coaching'
  },
  {
    name: 'SHOP',
    path: '/marketplace'
  },
  {
    name: 'HUB',
    path: '/hub'
  },
]
</script>

<template lang="pug">
.games
  v-img.process-game.aa(cover src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/games/overwatch.webp" alt="overwatch")
  v-img.process-game.aa(cover src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/games/team-fight-tactics.webp" alt="team-fight-tactics")
  .image-container(v-for="game in games")
    v-img.game.aa(:src="`https://storage.googleapis.com/divine-boost-bucket/assets/assets/games/${game}.webp`" :alt='game' alt="league-of-legends")
      .services
        v-btn.service(v-for="service in services") {{ service.name }}
  v-img.process-game.aa(cover src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/games/wild-rift.webp" alt="wild-rift")
  v-img.process-game.aa(cover src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/games/diablo.webp" alt="diablo")
  v-img.process-game.aa(cover src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/games/apex-legends.webp" alt="apex-legends")
  v-img.process-game.aa(cover src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/games/overwatch.webp" alt="overwatch")
  v-img.process-game.aa(cover src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/games/team-fight-tactics.webp" alt="team-fight-tactics")
  .image-container(v-for="game in games")
    v-img.game.aa(:src="`https://storage.googleapis.com/divine-boost-bucket/assets/assets/games/${game}.webp`" :alt='game')
      .services
        v-btn.service(v-for="service in services") {{ service.name }}
  v-img.process-game.aa(cover src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/games/wild-rift.webp" alt="wild-rift")
  v-img.process-game.aa(cover src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/games/diablo.webp" alt="diablo")

</template>

<style scoped>
.primary,
.second {
  display: flex;
}
.games {
  display:flex;
  justify-content: center;
  max-width: 2600px;
  margin: 0 auto;
  letter-spacing: 0px;
  z-index: 1;

  overflow-x: auto;
  overflow-x: hidden;
}
.process-game {
  min-width: 360px;
}
.game {
  height: 599px;
  width: 360px;
  /* height: 766px;
  width:  460px; */
  opacity: 0.98;
  z-index: 1;
}
.game:hover {
  transform: translateY(-10px);
  transition: transform 0.8s;
  border-radius: 1px;
}
.services {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    opacity: 0;
}
.services:hover {
  transition: transform 0.8s;
  opacity: 0.75;
}
.service {
  display:flex;
  justify-content: center;
  align-items: center;
  height: 25%;
  font-size: 48px;
  font-weight: bold;
  color: #fff;
  background-color: #000000;;
  letter-spacing: 0.96px;
  border-radius: 0px !important;
}
.service:hover {
  opacity: 1;
}

.aa {
  animation: slide 60s linear infinite;
}


@keyframes slide {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(2520px, 0, 0); /* The image width */
  }
}

</style>
<script setup>
import Banner from '@/components/Banner'
import BoostingOrdersFlow from '@/components/main/BoostingOrdersFlow'
import CoachingOrdersFlow from '@/components/main/CoachingOrdersFlow'

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

const informations = {
  boosting: ['Select your desired rank with best prices on the market.','Make your prefences with extra options.','Choose your own booster.', 'Track the progress.'],
  coaching: ['Select your in game-rank, type your expectations.', 'Edit your order with prefences.','Choose your own coach.','Book hours your own coach.'],
  shop: ['Buy and Sell Accounts in Market', 'Smurf Accounts','Cashflow','Daily refreshed goods', 'Win Prizes'],
  hub: ['Watch our content and learn macro, icro and gameknowledge','Check out the Leaderboard both for players like you and the boosters ','Search for your favorite champions in Rank #1 OTP Guides']
}
</script>

<template lang="pug">
Banner(splashArtPath = 'main' title = 'WE ARE THE ONES MAKING IT REAL' subtitle = 'We provide you everything that you need all in one place')
  .buttons
    img.purchase-eloboosting(src="@/assets/icons/purchase-eloboosting.png" alt="Boosting")
    v-btn.learn-more()
      span LEARN
        br
        | MORE
.background
  .games
    .image-container(v-for="game in games")
      v-img.game(:src="`../../src/assets/games/${game}.jpg`" :alt='game')
        .services
          v-btn.service(v-for="service in services") {{ service.name }}
    v-img.process-game(cover src="../../src/assets/games/overwatch.jpg")
    v-img.process-game(cover src="../../src/assets/games/team-fight-tactics.jpg")
v-divider.border-opacity-100(thickness="1rem")
.background
  .our-features
  .boosting
    .informations
      .title.boosting-title BOOSTING
      .sub-title Looking carries on your favorite games?
      div.list-informations
        .ad-bulamadim(v-for="information in informations.boosting")  {{ information }}
      .buttons
        v-btn.select-game
          img(src="@/assets/icons/league-of-legends.png" alt="Select Game")
        v-btn.second-purchase-eloboosting
          span PURCHASE
            br
            | ELOBOOSTING
    .logos
      img.sage(src="@/assets/icons/sage.png" alt="sage")
      img.challenger(src="@/assets/icons/challenger.png" alt="challenger")
    BoostingOrdersFlow
  .coaching
    CoachingOrdersFlow
    img.briston(src="@/assets/icons/bristo-profile.png" alt="briston")
    .coaching-informations
      .title.coaching-title COACHING
      .sub-title Need a pro that can coach you in-voice?
      div.list-informations
        .ad-bulamadim(v-for="information in informations.coaching")  {{ information }}
      .a
        .empty
        .buttons
          v-btn.third-purchase-eloboosting
            span PURCHASE
              br
              | COACHING
          v-btn.select-game
            img.valorant(src="@/assets/icons/valorant.png" alt="Select Game")

</template>

<style scoped>
.a {
  display:flex;
  justify-content: space-between;
}
.valorant {
  height: 54px;
}
.coaching-informations {
  align-self: flex-start;
  display:flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: right;
  padding: 7.5rem;
}
.briston {
  height: 490px;
  width: 360px;
  margin-right: -13rem;
  margin-top: 5rem;
}
.select-game {
  width: 80.012px;
  height: 80.882px;
  border-radius: 20px;
  background: #FFF;
}
.second-purchase-eloboosting {
  border-radius: 20px;
  background: #0083FF;
  width: 200.9px;
  height: 80.882px;
  color: #FFF;
  font-size: 20px;
  font-weight: 700;
}
.third-purchase-eloboosting {
  border-radius: 20px;
  background: #FF7A00;
  width: 200.9px;
  height: 80.882px;
  color: #FFF;
  font-size: 20px;
  font-weight: 700;
}
.list-informations {
  display: flex;
  flex-direction: column;
  gap: 11px;
  margin-top: -6px;
}
.logos {
  display: flex;
  flex-direction: column;
  padding-top: 4rem;
  margin-right: 4rem;
}
.informations {
  padding: 7.5rem;
  display:flex;
  flex-direction: column;
  gap: 1.5rem;
}
.sage {
  height: 170px;
  width: 170px;
  margin-top: -1rem;
  margin-left: -6.5rem;
}
.challenger {
  width: 299px;
  height: 174px;
  margin-top: 6rem;
  margin-left: -16rem;
}
.our-features {
  background-color: #ffffff;
  max-width: 1440px;
  margin: 0 auto;
}
.coaching,
.boosting {
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  justify-content: space-between;
}
.coaching {
  align-items: center
}
.boosting-title {
  color: #0083FF;
}
.coaching-title {
  color: #FF7A00
}
.title {
  font-size: 64px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.sub-title {
  color: rgba(0, 0, 0, 0.75);
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.ad-bulamadim {
  color: rgba(0, 0, 0, 0.50);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

}
.v-btn {
  letter-spacing: 0em !important;
}

.process-game {
  opacity: 0.95;
  min-width: 360px;
}
.process-game:hover {
  opacity: 1;
}
.purchase-eloboosting {
  /* padding: 115px 45px; */
  width: 231px;
  height: 93px;
  cursor: pointer;
  margin-bottom: 1rem;
}
.learn-more:hover,
.purchase-eloboosting:hover {
  transform: scale(1.05);
  transition: transform 0.8s;
}
.learn-more {
  width: 7.5rem;
  height: 93px;
  background-color:#fff;
  font-size: 20px;
  border-radius: 10px;
  font-weight: bold;
  letter-spacing: normal;
  color: #2C2F32;
}
.buttons {
  display: flex;
  gap: 1rem;;
}
.games {
  display:flex;
  justify-content: center;
  background-color: #0083FF;
  max-width: 1440px;
  margin: 0 auto;
  letter-spacing: 0px;
  z-index: 1;
}
.background {
  font-family: Inter;
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
}
.service:hover {
  opacity: 1;
}
.v-divider {
  border-color: #0083FF !important;
}
.title {
  font-size: 64px;
  font-weight: bold;
}
</style>
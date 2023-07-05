<script setup>
import Banner from '@/components/Banner'

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
  boosting: ['Select your desired rank with best prices on the market.','Make your prefences with extra options','Choose your own booster.', 'Track the progress.'],
  coaching: ['Select your in game-rank, type your expectations', 'Edit your order with prefences','Choose your own coach','Book hours your own coach'],
  shop: ['Buy and Sell Accounts in Market', 'Smurf Accounts','Cashflow','Daily refreshed goods', 'Win Prizes'],
  hub: ['Watch our content and learn macro, icro and gameknowledge','Check out the Leaderboard both for players like you and the boosters ','Search for your favorite champions in Rank #1 OTP Guides']
}

const orders = [
{
    hero: 'fiora',
    firstSpell: 'flash',
    secondSpell: 'teleport',
    score: '13/2/5',
    rank: 'Challenger I',
    lp: '275 LP',
},
{
    hero: 'thresh',
    firstSpell: 'flash',
    secondSpell: 'ignite',
    score: '1/3/21',
    rank: 'Master I',
    lp: '132 LP',
},
{
    hero: 'kaisa',
    firstSpell: 'flash',
    secondSpell: 'heal',
    score: '17/4/8',
    rank: 'Grandmaster',
    lp: '401 LP',
},
{
    hero: 'leeSin',
    firstSpell: 'flash',
    secondSpell: 'smite',
    score: '12/5/15',
    rank: 'Master I',
    lp: '195 LP',
},
{
    hero: 'yasuo',
    firstSpell: 'flash',
    secondSpell: 'ignite',
    score: '16/3/12',
    rank: 'Challenger I',
    lp: '255 LP',
},
{
    hero: 'jinx',
    firstSpell: 'flash',
    secondSpell: 'heal',
    score: '15/2/10',
    rank: 'Grandmaster',
    lp: '385 LP',
},
{
    hero: 'nautilus',
    firstSpell: 'flash',
    secondSpell: 'ignite',
    score: '3/7/20',
    rank: 'Master I',
    lp: '182 LP',
},
{
    hero: 'graves',
    firstSpell: 'flash',
    secondSpell: 'smite',
    score: '13/2/8',
    rank: 'Challenger I',
    lp: '302 LP',
},
{
    hero: 'irelia',
    firstSpell: 'flash',
    secondSpell: 'teleport',
    score: '12/1/7',
    rank: 'Challenger I',
    lp: '325 LP',
},
{
    hero: 'pyke',
    firstSpell: 'flash',
    secondSpell: 'ignite',
    score: '8/4/14',
    rank: 'Grandmaster',
    lp: '392 LP',
},
  {
    hero: 'akali',
    firstSpell: 'flash',
    secondSpell: 'ignite',
    score: '15/3/7',
    rank: 'Platinum II',
    lp: '42 LP',
  },
  {
    hero: 'yasuo',
    firstSpell: 'teleport',
    secondSpell: 'exhaust',
    score: '24/5/12',
    rank: 'Gold I',
    lp: '78 LP',
  },
  {
    hero: 'zed',
    firstSpell: 'ignite',
    secondSpell: 'flash',
    score: '8/4/10',
    rank: 'Diamond V',
    lp: '60 LP',
  },
  {
    hero: 'garen',
    firstSpell: 'teleport',
    secondSpell: 'flash',
    score: '17/7/8',
    rank: 'Silver II',
    lp: '95 LP',
  },
  {
    hero: 'camille',
    firstSpell: 'flash',
    secondSpell: 'teleport',
    score: '10/5/15',
    rank: 'Gold III',
    lp: '55 LP',
  },
  {
    hero: 'malzahar',
    firstSpell: 'ignite',
    secondSpell: 'flash',
    score: '13/10/11',
    rank: 'Platinum IV',
    lp: '70 LP',
  },
  {
    hero: 'brand',
    firstSpell: 'flash',
    secondSpell: 'exhaust',
    score: '11/7/12',
    rank: 'Silver I',
    lp: '89 LP',
  },
  {
    hero: 'senna',
    firstSpell: 'heal',
    secondSpell: 'flash',
    score: '9/3/16',
    rank: 'Gold IV',
    lp: '30 LP',
  },
  {
    hero: 'teemo',
    firstSpell: 'ignite',
    secondSpell: 'flash',
    score: '18/8/6',
    rank: 'Bronze I',
    lp: '98 LP',
  },
  {
    hero: 'yuumi',
    firstSpell: 'flash',
    secondSpell: 'teleport',
    score: '2/6/22',
    rank: 'Silver III',
    lp: '60 LP',
  },
  {
    hero: 'darius',
    firstSpell: 'ghost',
    secondSpell: 'flash',
    score: '21/9/3',
    rank: 'Diamond IV',
    lp: '40 LP',
  },
  {
    hero: 'ezreal',
    firstSpell: 'flash',
    secondSpell: 'heal',
    score: '14/7/11',
    rank: 'Platinum III',
    lp: '50 LP',
  }
]

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
        .ad-bulamadim(v-for="information in informations.boosting") {{ information }}
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
    .live-orders
      img.genji(src="@/assets/icons/genji.png" alt="genji")
      img.traffic-light(src="@/assets/icons/traffic-light.png" alt="genji")
      .list-container
        .orders
          .order(v-for="order in orders")
            .vertical-divider
            img.champion-photo(:src="`../../src/assets/squares/league-of-legends/${order.hero}.png`" :alt="order.hero")
            .spells
              img.spell(:src="`../../src/assets/summoner-spells/${order.firstSpell}.png`")
              img.spell(:src="`../../src/assets/summoner-spells/${order.secondSpell}.png`")
            .score {{ order.score }}
            .rank-information
              .rank  {{ order.rank }}
              .lp {{ order.lp }}
            img.rank-photo(:src="`../../src/assets/ranks/league-of-legends/${order.rank.split(' ')[0].toLowerCase()}.png`" :alt="order.rank")
        .orders
          .order(v-for="order in orders")
            .vertical-divider
            img.champion-photo(:src="`../../src/assets/squares/league-of-legends/${order.hero}.png`" :alt="order.hero")
            .spells
              img.spell(:src="`../../src/assets/summoner-spells/${order.firstSpell}.png`")
              img.spell(:src="`../../src/assets/summoner-spells/${order.secondSpell}.png`")
            .score {{ order.score }}
            .rank-information
              .rank  {{ order.rank }}
              .lp {{ order.lp }}
            img.rank-photo(:src="`../../src/assets/ranks/league-of-legends/${order.rank.split(' ')[0].toLowerCase()}.png`" :alt="order.rank")

</template>

<style scoped>
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

.rank,
.lp {
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  line-height: normal;
}
.rank-information {
  width: 140px;
}
.rank-photo {
  width: 66px;
  height: 66px;
}
.score {
  width: 90px;
  text-align: center;
  color: #888;
  font-size: 24px;
  font-weight: 500;
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
.champion-photo {
  height: 69px;
  width: 69px;
  border-radius: 5px;
}
.spells {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 7px;
  margin-left: -6px;
}
.spell {
  height: 32px;
  width: 32px;
}
.live-orders {
  width: 523px;
}
.orders {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 34px;
  overflow-y: auto;
  border: 1px #EEEEEE solid;
  padding: 1rem;
}
.list-container {
  height: 750px;
  overflow: hidden;
}
/* .list-container {
  overflow: hidden;
}

#orders {
  animation: scroll 5s linear infinite;
  list-style-type: none;
  padding: 0;
  margin: 0;
  height: 500px;
}

@keyframes scroll {
  0% { transform: translateY(0); }
  100% { transform: translateY(-300px); }
} */


.order {
  display:flex;
  align-items: center;
  justify-content: space-around;
  margin-left: -2rem;
  animation: slide 36s linear infinite;
}

@keyframes slide {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, -1600px , 0); /* The image width */
  }
}

.traffic-light {
  height: 36px;
  margin-top: 37px;
  margin-bottom: -6px
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
.genji {
  position: absolute;
  width: 171px;
  height: 194px;
  margin-top: -117px;
  margin-left: 390px;
  z-index: 3;
}
.our-features {
  background-color: #ffffff;
  max-width: 1440px;
  margin: 0 auto;
}
.boosting {
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  justify-content: space-between;
}
.boosting-title {
  color: #0083FF;
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
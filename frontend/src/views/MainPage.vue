<script setup>
import Banner from '@/components/Banner'
import BoostingOrdersFlow from '@/components/main/BoostingOrdersFlow'
import CoachingOrdersFlow from '@/components/main/CoachingOrdersFlow'
import ShopOrdersFlow from '@/components/main/ShopOrdersFlow'

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
  'our-features': ['24/7 Customer Support', 'Appear Offline & VPN Encryption', 'Track your Order', 'Chat with your booster'],
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
    .our-features-informations-and-irelia
      .our-features-pretitle Our Features
      .our-features-title IT HAS NEVER BEEN EASIER WITH YOUR FAVORITE GAMES!
      .sub-title Fast, safe, entertaining, professional.
      div.list-informations
        .ad-bulamadim(v-for="information in informations['our-features']")  {{ information }}
      img.irelia(src="@/assets/icons/irelia.png" alt="irelia")
    .features
      v-btn.select-service
        .row
          div
            span SELECT
              br
              | SERVICE
          img.button-image(src="@/assets/icons/select-service.png" alt="Select Game")
      v-btn.complete-payment
        .row
          div
            span COMPLETE
              br
              | PAYMENT
          img.button-image(src="@/assets/icons/complete-payment.png" alt="Complete Payment")
      v-btn.fast-secure
        .row
          div
            span FAST
              br
              | VPN SECURE
          img.button-image(src="@/assets/icons/fast-and-vpn-secure.png" alt="Fast & VPN Secure")
      v-btn.boost-rank
        .row
          div
            span BOOST
              br
              | RANK!
          img.button-image(src="@/assets/icons/boost-rank.png" alt="Boost Rank!")
  .little-divider
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
  .little-divider
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
            img.valorant(src="@/assets/icons/overwatch.png" alt="Select Game")
  .little-divider
  .shop
    .ceyiz-and-informations
      img.ceyiz(src="@/assets/icons/ceyiz.png" alt="ceyiz")
      .shop-informations
        .title.shop-title SHOP
        .sub-title Looking for accounts?
        div.list-informations
          .ad-bulamadim(v-for="information in informations.shop")  {{ information }}
        .buttons
          v-btn.select-game
            img.valorant(src="@/assets/icons/valorant.png" alt="Select Game")
          v-btn.checkout-marketplace
            span CHECK OUT
              br
              | MARKETPLACE
    .overwatch-images
      img.dva(src="@/assets/icons/dva.png" alt="dva")
      img.tracer(src="@/assets/icons/tracer.png" alt="tracer")
    ShopOrdersFlow
  .little-divider
  .hub
    .images
      img.leaderboard(src="@/assets/icons/leaderboard.png" alt="leaderboard")
      img.guides(src="@/assets/icons/guides.png" alt="guides")
      img.lessons(src="@/assets/icons/lessons.png" alt="lessons")
      img.hub-image(src="@/assets/icons/hub.png" alt="hub")
    .hub-informations
      .title.hub-title HUB
      .sub-title Haven't you seen our player hub yet?
      div.list-informations
        .ad-bulamadim(v-for="information in informations.hub")  {{ information }}

</template>

<style scoped>
.features {
  padding-top: 8.5rem;
}
.button-image {
  height: 50px;
  width: 50px;
}

.select-service,
.complete-payment,
.fast-secure,
.boost-rank {
  width: 277px;
  height: 104px;
  border-radius: 5px;
  text-align: center;
  font-size: 24px;
  font-weight: 900;

}
.select-service {
  background-color: #F5EEFF;
  color: #CAA6FF;
  margin: 3.5rem 0 0 -3.5rem;
}
.complete-payment {
  background-color: #EAFFF4;
  color: #46B87C;
  margin: 0 0 0 3.5rem;
}
.fast-secure {
  background-color: #FFF8E4;
  color: #FFD976;
  margin: 3.5rem 0 0 -3.5rem;
}
.boost-rank {
  background-color: #FFE3E3;
  color: #F98484;
  margin: 0 0 0 3.5rem;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5em;
}
.our-features-informations-and-irelia {
  display:flex;
  flex-direction: column;
  gap: 1rem;
  padding: 5rem;
  padding-bottom: 0rem;
}
.irelia {
  height: 420px;
  width: 424px;
  align-self: flex-end;
  margin-top: -7rem;
}
.our-features-pretitle {
  color: #0047FF;
  font-size: 24px;
  font-weight: 700;
}
.our-features-title {
  color: #000;
  font-size: 40px;
  font-weight: 700;
}
.boosting,
.coaching,
.shop,
.hub {
  border-top: 1px #EEEEEE solid;
  border-bottom: 1px #EEEEEE solid;
}
.shop-title {
  color: #FFB800;
}
.hub-title {
  color: #9948FF;
}
.hub {
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  padding: 160px 7rem 160px 20px;
  height: 700px;
}
.images {
  display: flex;
  gap: 1.5rem;
  align-items: flex-end;
}
.leaderboard {
  height: 303px;
  widows: 215;
}
.guides {
  height: 231px;
  width: 217px;
}
.lessons {
  height: 213px;
  width: 190px;

}
.hub-image {
  height: 170px;
  width: 170px;
  align-self: flex-start;
  margin-top: -2.5rem;
}
.shop-title {
  color: #FFB800;
}
.ceyiz {
  height: 119px;
  width: 404px;
}
.dva {
  width: 147px;
  height: 170px;
  /* transform: rotate(-19.073deg); */
  margin: 8rem 0 0 -7rem;
}
.tracer {
  width: 361.746px;
  height: 306.606px;
  margin: 7rem 0 0 -8rem;;
}
.shop {
  display:flex;
  justify-content: space-between;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2.5rem;
  padding-right: 7rem;
}
.overwatch-images {
  display: flex;
  flex-direction: column;
}
.shop-informations {
  display:flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 72px;
}
.hub-informations {
  display:flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: right;
  margin-left: -7rem;
}
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
.checkout-marketplace {
  border-radius: 20px;
  background: #FFB800;
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
  padding: 7.5rem 0;
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
  display: flex;
}
.coaching,
.boosting {
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  justify-content: space-between;
}
.boosting {
  padding-right: 7.5rem;
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
  font-size: 22px;
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
.ad-bulamadim:before {
  content: "• ";
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
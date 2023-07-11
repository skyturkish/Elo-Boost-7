<script setup>
import BoostingOrdersFlow from '@/components/main/BoostingOrdersFlow'
import CoachingOrdersFlow from '@/components/main/CoachingOrdersFlow'
import ShopOrdersFlow from '@/components/main/ShopOrdersFlow'
import Games from '@/components/main/Games'

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
    v-btn.purchase-eloboosting()
      span PURCHASE
        br
        | ELOBOOSTING
    v-btn.learn-more()
      span LEARN
        br
        | MORE
Games
v-divider.border-opacity-100(thickness="1rem")
.background
  .our-features
    .our-features-informations-and-irelia
      .our-features-pretitle Our Features
      .our-features-title IT HAS NEVER BEEN EASIER WITH YOUR FAVORITE GAMES!
      .sub-title Fast, safe, entertaining, professional.
      div.list-informations
        .ad-bulamadim(v-for="information in informations['our-features']")  {{ information }}
      img.irelia(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/irelia.webp" alt="irelia")
    .features
      v-btn.select-service
        .row
          div
            span SELECT
              br
              | SERVICE
          img.button-image(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/select-service.webp" alt="Select Game")
      v-btn.complete-payment
        .row
          div
            span COMPLETE
              br
              | PAYMENT
          img.button-image(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/complete-payment.webp" alt="Complete Payment")
      v-btn.fast-secure
        .row
          div
            span FAST
              br
              | VPN SECURE
          img.button-image(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/fast-and-vpn-secure.webp" alt="Fast & VPN Secure")
      v-btn.boost-rank
        .row
          div
            span BOOST
              br
              | RANK!
          img.button-image(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/boost-rank.webp" alt="Boost Rank!")
  .little-divider
  .boosting
    .informations
      .title.boosting-title BOOSTING
      .sub-title Looking carries on your favorite games?
      div.list-informations
        .ad-bulamadim(v-for="information in informations.boosting")  {{ information }}
      .buttons
        v-btn.select-game
          img(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/league-of-legends.webp" alt="Select Game")
        v-btn.second-purchase-eloboosting
          span PURCHASE
            br
            | ELOBOOSTING
    .logos
      img.sage(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/sage.webp" alt="sage")
      img.challenger(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/challenger.webp" alt="challenger")
    BoostingOrdersFlow
  .little-divider
  .coaching
    CoachingOrdersFlow
    img.briston(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/bristo-profile.webp" alt="briston")
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
            img.valorant(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/overwatch.webp" alt="Select Game")
  .little-divider
  .shop
    .ceyiz-and-informations
      .shop-informations
        .title.shop-title SHOP
        .sub-title Looking for accounts?
        div.list-informations
          .ad-bulamadim(v-for="information in informations.shop")  {{ information }}
        .buttons
          v-btn.select-game
            img.valorant(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/valorant.webp" alt="Select Game")
          v-btn.checkout-marketplace
            span CHECK OUT
              br
              | MARKETPLACE
    .overwatch-images
      img.dva(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/dva.webp" alt="dva")
      img.tracer(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/tracer.webp" alt="tracer")
    ShopOrdersFlow
  .little-divider
  .hub
    .images
      img.leaderboard(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/leaderboard.webp" alt="leaderboard")
      img.guides(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/guides.webp" alt="guides")
      img.lessons(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/lessons.webp" alt="lessons")
      img.hub-image(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/hub.webp" alt="hub")
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
  box-shadow:  0 0 12px 1px #DCC7FB;
}
.complete-payment {
  background-color: #EAFFF4;
  color: #46B87C;
  margin: 0 0 0 3.5rem;
  box-shadow:  0 0 12px 1px #BEF6D8;
}
.fast-secure {
  background-color: #FFF8E4;
  color: #FFD976;
  margin: 3.5rem 0 0 -3.5rem;
  box-shadow:  0 0 12px 1px #F8E5B3;
}
.boost-rank {
  background-color: #FFE3E3;
  color: #F98484;
  margin: 0 0 0 3.5rem;
  box-shadow:  0 0 12px 1px #F6B9B9;
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
  padding-top: 10rem;

}
.shop {
  padding-top: 10rem;

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
  margin-left: -5.5rem;
}
.challenger {
  width: 299px;
  height: 174px;
  margin-top: 8rem;
  margin-left: -13rem;
}
.our-features {
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

.purchase-eloboosting {
  /* padding: 115px 45px; */
  width: 231px;
  height: 93px;
  color: #FFF;
  font-size: 24px;
  font-weight: 700;
  background-color:#0066FF;
  background-image:
  radial-gradient(at 100% 0%, #58FF9B  1px, transparent 70%),
  radial-gradient(at 0% 100%, #C7D3FF 0px, transparent 70%),
  radial-gradient(at 50% 100%, #006B8D 0px, transparent 70%),
  radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 70%),
  radial-gradient(at 100% 50%, #58FF9B 0px, transparent 70%);
  position: relative;
  overflow: hidden;
  transition: .3s;
  z-index: 1;
}
.purchase-eloboosting::before {
 content: '';
 width: 0;
 height: 300%;
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%) rotate(45deg);
 transition: .5s ease;
 display: block;
 z-index: -1;
 background-color:#FFF;
}

.purchase-eloboosting:hover:before {
  width: 105%;
}
.purchase-eloboosting:hover {
  color: #000000;
}

.learn-more:hover,
.purchase-eloboosting:hover {
  transition: transform 0.8s;
}
.learn-more {
  width: 7.5rem;
  height: 93px;
  background-color:#fff;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: normal;
  color: #2C2F32;
}
.buttons {
  display: flex;
  gap: 1rem;;
  padding-top: 1rem;
}

.background {
  font-family: Inter;
}
.v-divider {
  border-color: #0083FF !important;
}
.title {
  font-size: 64px;
  font-weight: bold;
}
</style>
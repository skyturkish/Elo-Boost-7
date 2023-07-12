<script setup>
const orders = [
{
    hero: 'fiora',
    firstSpell: 'flash',
    secondSpell: 'teleport',
    score: '13/2/5',
    rank: 'Challenger',
    lp: '1120 LP',
    win: true,
},
{
    hero: 'thresh',
    firstSpell: 'flash',
    secondSpell: 'ignite',
    score: '1/3/21',
    rank: 'Master',
    win: true,
    lp: '132 LP',
},
{
    hero: 'kaisa',
    firstSpell: 'flash',
    secondSpell: 'heal',
    score: '17/4/8',
    rank: 'Grandmaster',
    win: false,
    lp: '710LP',
},
{
    hero: 'leesin',
    firstSpell: 'flash',
    secondSpell: 'smite',
    score: '12/5/15',
    rank: 'Master',
    win: true,
    lp: '195 LP',
},
{
    hero: 'yasuo',
    firstSpell: 'flash',
    secondSpell: 'ignite',
    score: '16/3/12',
    rank: 'Challenger',
    lp: '1288 LP',
    win: false,
},
{
    hero: 'jinx',
    firstSpell: 'flash',
    secondSpell: 'heal',
    score: '15/2/10',
    rank: 'Grandmaster',
    win: true,
    lp: '910 LP',
},
{
    hero: 'nautilus',
    firstSpell: 'flash',
    secondSpell: 'ignite',
    score: '3/7/20',
    rank: 'Master',
    win: false,
    lp: '182 LP',
},
{
    hero: 'graves',
    firstSpell: 'flash',
    secondSpell: 'smite',
    score: '13/2/8',
    rank: 'Challenger',
    win: true,
    lp: '980 LP',
},
{
    hero: 'irelia',
    firstSpell: 'flash',
    secondSpell: 'teleport',
    score: '12/1/7',
    rank: 'Challenger',
    win: true,
    lp: '1080 LP',
},
{
    hero: 'pyke',
    firstSpell: 'flash',
    secondSpell: 'ignite',
    score: '8/4/14',
    win: true,
    rank: 'Grandmaster',
    lp: '880 LP',
},
  {
    hero: 'akali',
    firstSpell: 'flash',
    secondSpell: 'ignite',
    score: '15/3/7',
    win: false,
    rank: 'Platinum II',
    lp: '42 LP',
  },
  {
    hero: 'yasuo',
    firstSpell: 'flash',
    win: true,
    secondSpell: 'exhaust',
    score: '24/5/12',
    rank: 'Gold I',
    lp: '78 LP',
  },
  {
    hero: 'zed',
    firstSpell: 'ignite',
    win: true,
    secondSpell: 'flash',
    score: '8/4/10',
    rank: 'Diamond V',
    lp: '60 LP',
  },
  {
    hero: 'garen',
    firstSpell: 'teleport',
    win: true,
    secondSpell: 'flash',
    score: '17/7/8',
    rank: 'Silver II',
    lp: '95 LP',
  },
  {
    hero: 'camille',
    firstSpell: 'flash',
    secondSpell: 'teleport',
    win: true,
    score: '10/5/15',
    rank: 'Gold III',
    lp: '55 LP',
  },
]

</script>

<template lang="pug">
.live-orders
  img.genji(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/genji.webp" alt="genji")
  img.traffic-light(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/traffic-light.webp" alt="genji")
  .loop-slider
    .inner
      .order(v-for="order in orders")
        .vertical-divider(:style="{backgroundColor: order.win ? '#4285FF' : '#FF0000' }")
        img.champion-photo(:src="`https://storage.googleapis.com/divine-boost-bucket/assets/assets/squares/league-of-legends/${order.hero}.webp`" :alt="order.hero")
        .spells
          img.spell(:src="`https://storage.googleapis.com/divine-boost-bucket/assets/assets/summoner-spells/${order.firstSpell}.webp`")
          img.spell(:src="`https://storage.googleapis.com/divine-boost-bucket/assets/assets/summoner-spells/${order.secondSpell}.webp`")
        .score {{ order.score }}
        .rank-information
          .rank  {{ order.rank }}
          .lp(:style="{color: order.win ? '#4285FF' : '#FF0000' }") {{ order.lp }}
        img.rank-photo(:src="`https://storage.googleapis.com/divine-boost-bucket/assets/assets/ranks/league-of-legends/${order.rank.split(' ')[0].toLowerCase()}.webp`" :alt="order.rank")
      .order(v-for="order in orders")
        .vertical-divider(:style="{backgroundColor: order.win ? '#4285FF' : '#FF0000' }")
        img.champion-photo(:src="`https://storage.googleapis.com/divine-boost-bucket/assets/assets/squares/league-of-legends/${order.hero}.webp`" :alt="order.hero")
        .spells
          img.spell(:src="`https://storage.googleapis.com/divine-boost-bucket/assets/assets/summoner-spells/${order.firstSpell}.webp`")
          img.spell(:src="`https://storage.googleapis.com/divine-boost-bucket/assets/assets/summoner-spells/${order.secondSpell}.webp`")
        .score {{ order.score }}
        .rank-information
          .rank  {{ order.rank }}
          .lp(:style="{color: order.win ? '#4285FF' : '#FF0000' }") {{ order.lp }}
        img.rank-photo(:src="`https://storage.googleapis.com/divine-boost-bucket/assets/assets/ranks/league-of-legends/${order.rank.split(' ')[0].toLowerCase()}.webp`" :alt="order.rank")

</template>

<style scoped>
.loop-slider {
  height: 750px;
  overflow: hidden;
}
.inner {
  display: flex;
  flex-direction: column;
  animation-name: loop;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 60s;
  gap: 34px;
  border: 1px #EEEEEE solid;
  padding: 1rem;
}

@keyframes loop {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}
.vertical-divider {
  width: 5px;
  height: 105px;
  margin-top: -2.2rem;
  margin-left: 1rem;
}
.live-orders {
  width: 523px;
}
.genji {
  position: absolute;
  width: 171px;
  height: 194px;
  margin-top: -117px;
  margin-left: 390px;
  z-index: 3;
}
.traffic-light {
  height: 36px;
  margin-top: 34px;
  margin-bottom: -6px
}
.order {
  display:flex;
  align-items: center;
  justify-content: space-around;
  margin-left: -2rem;
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
.score {
  width: 90px;
  text-align: center;
  color: #888;
  font-size: 24px;
  font-weight: 500;
}
.rank-information {
  width: 140px;
}

.rank {
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  line-height: normal;
  color: #888;

}
.lp {
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  line-height: normal;
}
.rank-photo {
  width: 66px;
  height: 66px;
}
</style>
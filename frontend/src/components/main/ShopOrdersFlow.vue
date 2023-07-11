<script setup>
const orders = [
  {
      rank: 'challenger',
      lp: 367,
      wr: '%78',
      skin: 250,
      hero: 108,
      gainLp: '21',
  },
  {
      rank: 'grandmaster',
      lp: 319,
      wr: '%72',
      skin: 300,
      hero: 89,
      gainLp: '29',
  },
  {
      rank: 'master',
      lp: 250,
      wr: '%69',
      skin: 43,
      hero: 67,
      gainLp: '25',
  },
  {
      rank: 'diamond III',
      lp: 89,
      wr: '%65',
      skin: 120,
      hero: 87,
      gainLp: '33',
  },
  {
      rank: 'diamond IV',
      lp: 110,
      wr: '%75',
      skin: 100,
      hero: 51,
      gainLp: '31',
  },
  {
      rank: 'challenger',
      lp: 367,
      wr: '%78',
      skin: 250,
      hero: 108,
      gainLp: '21',
  },
  {
      rank: 'grandmaster',
      lp: 319,
      wr: '%72',
      skin: 300,
      hero: 89,
      gainLp: '29',
  },
  {
      rank: 'master',
      lp: 250,
      wr: '%69',
      skin: 43,
      hero: 67,
      gainLp: '25',
  },
  {
      rank: 'diamond III',
      lp: 89,
      wr: '%65',
      skin: 120,
      hero: 87,
      gainLp: '33',
  },
  {
      rank: 'diamond IV',
      lp: 110,
      wr: '%75',
      skin: 100,
      hero: 51,
      gainLp: '31',
  },
  {
      rank: 'challenger',
      lp: 367,
      wr: '%78',
      skin: 250,
      hero: 108,
      gainLp: '21',
  },
  {
      rank: 'grandmaster',
      lp: 319,
      wr: '%72',
      skin: 300,
      hero: 89,
      gainLp: '29',
  },
  {
      rank: 'master',
      lp: 250,
      wr: '%69',
      skin: 43,
      hero: 67,
      gainLp: '25',
  },
  {
      rank: 'diamond III',
      lp: 89,
      wr: '%65',
      skin: 120,
      hero: 87,
      gainLp: '33',
  },
  {
      rank: 'diamond IV',
      lp: 110,
      wr: '%75',
      skin: 100,
      hero: 51,
      gainLp: '31',
  },
  {
      rank: 'challenger',
      lp: 367,
      wr: '%78',
      skin: 250,
      hero: 108,
      gainLp: '21',
  },
  {
      rank: 'grandmaster',
      lp: 319,
      wr: '%72',
      skin: 300,
      hero: 89,
      gainLp: '29',
  },
  {
      rank: 'master',
      lp: 250,
      wr: '%69',
      skin: 43,
      hero: 67,
      gainLp: '25',
  },
  {
      rank: 'diamond III',
      lp: 89,
      wr: '%65',
      skin: 120,
      hero: 87,
      gainLp: '33',
  },
  {
      rank: 'diamond IV',
      lp: 110,
      wr: '%75',
      skin: 100,
      hero: 51,
      gainLp: '31',
  }
]

</script>

<template lang="pug">
.live-orders
  img.traffic-light(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/traffic-light.webp" alt="genji")
  .list-container
    .orders
      .order(v-for="order in orders")
        .vertical-divider(:style="{backgroundColor: orders.indexOf(order) % 2 == 0 ? '#FFB800' : '#DF642B' }")
        .column
          img.rank-photo(:src="`https://storage.googleapis.com/divine-boost-bucket/assets/assets/ranks/league-of-legends/${order.rank.split(' ')[0]}.webp`" :alt="order.rank")
          .rank-text {{ order.rank.toUpperCase() }}
          .rank-lp {{ order.lp }} LP
        .column
          .wr {{ order.wr }} WR
          .skin {{ order.skin }} SKIN
          .hero {{ order.hero }} CHAMP
        .column
          .gain-lp +{{ order.gainLp }} LP
          v-btn.buy-button(:style="{backgroundColor: orders.indexOf(order) % 2 == 0 ? '#FFB800' : '#DF642B' }") BUY

</template>

<style scoped>
.buy-button {
  width: 95px;
  height: 41px;
  border-radius: 30px;
  color: #FFF;
  font-size: 15px;
  font-weight: 700;
}
.live-orders {
  font-family: Inter;
}
.rank-text,
.rank-lp,
.skin,
.hero {
  color: #888;
  font-size: 20px;
  font-weight: 500;
}
.wr,
.gain-lp {
  color: #E37846;
  font-size: 24px;
  font-weight: 600;
}
.column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.rank-photo {
  height: 115px;
  width: 115px;
}
.traffic-light {
  height: 36px;
  margin-top: 34px;
  margin-bottom: -6px
}
.list-container {
  height: 750px;
  overflow: hidden;
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
    transform: translate3d(0, -1600px , 0);
  }
}
</style>
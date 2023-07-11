<script setup>
const orders = [
  {
      photo: "https://p4.wallpaperbetter.com/wallpaper/988/526/426/anime-noragami-yato-noragami-hd-wallpaper-preview.jpg",
      role: 'coach',
      name: 'Reve',
      rank: 'challenger',
  },
  {
      photo: "https://i.pinimg.com/564x/00/ff/c6/00ffc6288cdc3039d95c772b05a1ef97.jpg",
      role: 'elite booster',
      name: 'Kira',
      rank: 'grandmaster',
  },
  {
      photo: "https://p4.wallpaperbetter.com/wallpaper/988/526/426/anime-noragami-yato-noragami-hd-wallpaper-preview.jpg",
      role: 'coach',
      name: 'Reve',
      rank: 'challenger',
  },
  {
      photo: "https://i.pinimg.com/564x/00/ff/c6/00ffc6288cdc3039d95c772b05a1ef97.jpg",
      role: 'elite booster',
      name: 'Kira',
      rank: 'grandmaster',
  },
  {
      photo: "https://p4.wallpaperbetter.com/wallpaper/988/526/426/anime-noragami-yato-noragami-hd-wallpaper-preview.jpg",
      role: 'coach',
      name: 'Reve',
      rank: 'challenger',
  },
  {
      photo: "https://i.pinimg.com/564x/00/ff/c6/00ffc6288cdc3039d95c772b05a1ef97.jpg",
      role: 'elite booster',
      name: 'Kira',
      rank: 'grandmaster',
  },
  {
      photo: "https://p4.wallpaperbetter.com/wallpaper/988/526/426/anime-noragami-yato-noragami-hd-wallpaper-preview.jpg",
      role: 'coach',
      name: 'Reve',
      rank: 'challenger',
  },
  {
      photo: "https://i.pinimg.com/564x/00/ff/c6/00ffc6288cdc3039d95c772b05a1ef97.jpg",
      role: 'elite booster',
      name: 'Kira',
      rank: 'grandmaster',
  },
  {
      photo: "https://p4.wallpaperbetter.com/wallpaper/988/526/426/anime-noragami-yato-noragami-hd-wallpaper-preview.jpg",
      role: 'coach',
      name: 'Reve',
      rank: 'challenger',
  },
  {
      photo: "https://i.pinimg.com/564x/00/ff/c6/00ffc6288cdc3039d95c772b05a1ef97.jpg",
      role: 'elite booster',
      name: 'Kira',
      rank: 'grandmaster',
  },
  {
      photo: "https://p4.wallpaperbetter.com/wallpaper/988/526/426/anime-noragami-yato-noragami-hd-wallpaper-preview.jpg",
      role: 'coach',
      name: 'Reve',
      rank: 'challenger',
  },
  {
      photo: "https://i.pinimg.com/564x/00/ff/c6/00ffc6288cdc3039d95c772b05a1ef97.jpg",
      role: 'elite booster',
      name: 'Kira',
      rank: 'grandmaster',
  },
  {
      photo: "https://p4.wallpaperbetter.com/wallpaper/988/526/426/anime-noragami-yato-noragami-hd-wallpaper-preview.jpg",
      role: 'coach',
      name: 'Reve',
      rank: 'challenger',
  },
  {
      photo: "https://i.pinimg.com/564x/00/ff/c6/00ffc6288cdc3039d95c772b05a1ef97.jpg",
      role: 'elite booster',
      name: 'Kira',
      rank: 'grandmaster',
  },
  {
      photo: "https://p4.wallpaperbetter.com/wallpaper/988/526/426/anime-noragami-yato-noragami-hd-wallpaper-preview.jpg",
      role: 'coach',
      name: 'Reve',
      rank: 'challenger',
  },
  {
      photo: "https://i.pinimg.com/564x/00/ff/c6/00ffc6288cdc3039d95c772b05a1ef97.jpg",
      role: 'elite booster',
      name: 'Kira',
      rank: 'grandmaster',
  },
  {
      photo: "https://p4.wallpaperbetter.com/wallpaper/988/526/426/anime-noragami-yato-noragami-hd-wallpaper-preview.jpg",
      role: 'coach',
      name: 'Reve',
      rank: 'challenger',
  },
  {
      photo: "https://i.pinimg.com/564x/00/ff/c6/00ffc6288cdc3039d95c772b05a1ef97.jpg",
      role: 'elite booster',
      name: 'Kira',
      rank: 'grandmaster',
  }
]

</script>

<template lang="pug">
.live-orders
  img.traffic-light(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/traffic-light-right.webp" alt="genji")
  .list-container
    .orders
      .order(v-for="order in orders")
        div.row.information
          img.champion-photo(:src="order.photo" :alt="order.name")
          .booster-informations
            .role  {{ order.role }}
            .name {{ order.name }}
        div.row.rank
          img.rank-photo(:src="`https://storage.googleapis.com/divine-boost-bucket/assets/assets/ranks/league-of-legends/${order.rank.split(' ')[0].toLowerCase()}.webp`" :alt="order.rank")
          .vertical-divider(:style="{backgroundColor: orders.indexOf(order) % 2 == 0 ? '#FF7A00' : '#FEB36F' }")
</template>

<style scoped>
.information {
  margin-left: -2rem;
}
.rank {
  margin-right: -4.5rem;
}
.row {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.role {
  color: #888;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
}
.name {
  color: #555;
  font-size: 24px;
  font-weight: 500;
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
.champion-photo {
  height: 69px;
  width: 69px;
  border-radius: 5px;
}
.booster-informations {
  width: 140px;
}

.rank-photo {
  width: 66px;
  height: 66px;
}
</style>
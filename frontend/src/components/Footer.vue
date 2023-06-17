<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const links = {
  BOOSTING: [
    {
      name: 'League of Legends',
      path: '/boosting/league-of-legends/division'
    },
    {
      name: 'Valorant',
      path: '/boosting/valorant/division'
    },
  ],
  COACHING: [
    {
      name: 'League of Legends',
      path: '/coaching/league-of-legends/lesson'
    },
    {
      name: 'Valorant',
      path: '/coaching/valorant/lesson'
    },
  ],
  MARKETPLACE: [
    {
      name: 'Account Shop',
      path: '/marketplace/account'
    },
    {
      name: 'Fresh Accounts',
      path: '/marketplace/fresh-account'
    },
    {
      name: 'Buy Premium',
      path: '/premium'
    }
  ],
  LESSONS: [
    {
      name: 'Learn to Play',
      path: '/lessons/learn-to-play'
    },
    {
      name: 'OTP Guides',
      path: '/lessons/otp-guides'
    }
  ],
  EXTRA: [
    {
      name: 'Leaderboard',
      path: '/leaderboard'
    },
    {
      name: 'Blog',
      path: '/blog'
    },
    {
      name: 'Legal',
      path: '/coaching/league-of-legends/lesson'
    }
  ]
}

</script>

<template lang="pug">
.footer-background
  .footer
    .title(v-for="(sublinks,title) in links") {{ title }}
      .sublink(v-for="sublink in sublinks" @click="router.push(sublink.path)") {{sublink.name}}
</template>

<style scoped>
.footer-background {
  font-family: Inter;
  height: 311px;
  background-color: #000;
}
.footer {
  display: flex;
  gap: 2rem;
  padding:2.5rem;
  width: 1440px;
  margin: 0 auto;
  justify-content: center;
}
.title {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.sublink {
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}

</style>
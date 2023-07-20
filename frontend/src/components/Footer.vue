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
    // {
    //   name: 'TFT',
    //   path: '/boosting/team-fight-tactics/win'
    // },
    // {
    //   name: 'Overwatch',
    //   path: '/boosting/overwatch/division'
    // },
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
    // {
    //   name: 'TFT',
    //   path: '/coaching/team-fight-tactics/lesson'
    // },
    // {
    //   name: 'Overwatch',
    //   path: '/coaching/overwatch/lesson'
    // },
  ],
  MARKETPLACE: [
    {
      name: 'Account Shop',
      path: '/marketplace/account-shop'
    },
    {
      name: 'Fresh Accounts',
      path: '/marketplace/fresh-accounts'
    },
  ],
  CONTENT: [
    {
      name: 'Coaching Videos',
      path: '/content/coaching-videos'
    },
    {
      name: 'OTP Guides',
      path: '/content/otp-guides'
    },
    {
      name: 'Blog',
      path: '/content/blog'
    },
  ],
  EXTRA: [
    {
      name: 'Leaderboard',
      path: '/extra/leaderboard'
    },
    {
      name: 'Legal',
      path: '/extra/legal'
    },
    {
      name: 'Contact',
      path: '/extra/contact'
    },
    {
      name: 'FAQ',
      path: '/extra/faq'
    },
  ]
}

</script>

<template lang="pug">
.footer-background
  .content
    .titles
      .title(v-for="(sublinks,title) in links") {{ title }}
        .sub-title(v-for="sublink in sublinks" @click="router.push(sublink.path)") {{sublink.name}}
    .privacy This website nor the brand isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc. Overwatch, Diablo are trademarks and/or registered trademarks of Blizzard Entertainment Inc.
</template>

<style scoped>
.footer-background {
  background-color: #111111;
  padding-bottom: 100px;
}
.content {
  display:flex;
  flex-direction: column;
  max-width: 1440px;
  margin: 0 auto;
  padding-top: 2rem;
}
.titles {
  display: flex;
  justify-content: center;
  gap: 7rem;
  padding: 2.5rem;
}
.title {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.sub-title {
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}
.reserved {
  font-size: 16px;
  color: #fff;
  width: 1160px;
  margin: 0 auto;
}
.privacy {
  color: #FFF;
  font-size: 14px;
  font-weight: 500;
  width: 1160px;
  padding-top: 20px;
  margin: 0 auto;
}
</style>
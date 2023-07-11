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
  ],
  CONTENT: [
    {
      name: 'Coaching Videos',
      path: '/lessons/learn-to-play'
    },
    {
      name: 'OTP Guides',
      path: '/lessons/otp-guides'
    },
    {
      name: 'Blog',
      path: '/lessons/otp-guides'
    },
  ],
  EXTRA: [
    {
      name: 'Leaderboard',
      path: '/leaderboard'
    },
    {
      name: 'Legal',
      path: '/legal'
    },
    {
      name: 'Contact',
      path: '/contact'
    },
    {
      name: 'FAQ',
      path: '/faq'
    },
  ]
}

</script>

<template lang="pug">
.footer-background
  .content
    .socials
      img.facebook-social(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/facebook.webp" alt="facebook")
      img.discord-social(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/discord.webp" alt="discord")
      img.instagram-social(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/icons/instagram.webp" alt="instagram")
    .titles
      .title(v-for="(sublinks,title) in links") {{ title }}
        .sub-title(v-for="sublink in sublinks" @click="router.push(sublink.path)") {{sublink.name}}
    .reserved 2023 Divine Gaming Services - All rights reserved.
    .privacy This website nor the brand isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
</template>

<style scoped>
.socials {
  display: flex;
  gap: 8px;
  align-self: self-end;
}
.facebook-social,
.instagram-social {
  width: 29px;
  height: 29px;
  cursor: pointer;
}
.discord-social {
  width: 29px;
  height: 33px;
  cursor: pointer;
}
.footer-background {
  font-family: Inter;
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
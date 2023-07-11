<script setup>
import AppBar from '@/components/Appbar'

const props = defineProps({
  splashArtPath: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
})
</script>

<template lang="pug">
.background(:style="{ backgroundImage: `url(https://storage.googleapis.com/divine-boost-bucket/assets/assets/banners/${splashArtPath}.webp)` }")
  .content
    AppBar
    .TRUST-PILOT-5-STAR-REVIEW ‏‏‏‏‏‏‏‏
    .title {{ title }}
    .subtitle {{ subtitle }}
    .dynamic
      slot
</template>

<style scoped>
.background {
  background-size: cover;
  background-position: 50%;
}
.content {
  display:flex;
  flex-direction: column;
  max-width: 1840px;
  min-width: 960px;
  margin: 0 auto;
  padding: 42px 40px 30px 45px;
}
.TRUST-PILOT-5-STAR-REVIEW {
  padding-top: 3rem;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
}
.title {
  padding-top: 0.5rem;
  font-size: 48px;
  font-weight: bold;
  color: #fff;
}
.subtitle {
  padding-top: 0.5rem;
  font-family: Inter;
  font-size: 32px;
  font-weight: 500;
  color: #fff;
}
.dynamic {
  padding-top: 2rem;
}
</style>
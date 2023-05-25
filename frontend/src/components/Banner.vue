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
  backgroundColor: {
    type: String,
    default: '#101922'
  }
})

const imgUrls = import.meta.glob('../assets/banners/*.png', {
  import: 'default',
  eager: true
})
</script>

<template lang="pug">
v-img.image(cover :src='imgUrls[`../assets/banners/${splashArtPath}.png`]')
  .content
    AppBar
    .TRUST-PILOT-5-STAR-REVIEW ** TRUST PILOT 5 STAR REVIEW **
    .title {{ title }}
    .subtitle {{ subtitle }}
    .dynamic
      slot
</template>

<style scoped>
.image {
  max-height: 540px;
  margin: 0 auto;
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
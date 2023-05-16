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
.banner(:style="{ backgroundColor: backgroundColor }")
  v-img.image(
    aspect-ratio='16/9'
    cover=''
    :src='imgUrls[`../assets/banners/${splashArtPath}.png`]')
    .content
      AppBar
      .TRUST-PILOT-5-STAR-REVIEW ** TRUST PILOT 5 STAR REVIEW **
      .title {{ title }}
      .subtitle {{ subtitle }}
      slot
</template>

<style scoped>
.image {
  max-height: 600px;
  max-width: 1440px;
  margin: 0 auto;
}
.content {
  display:flex;
  flex-direction: column;
  max-width: 1440px;
  min-width: 960px;
  margin: 0 auto;
  padding: 3.6rem;
  gap: 1rem;
}
.TRUST-PILOT-5-STAR-REVIEW {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
}
.title {
  font-size: 48px;
  font-weight: bold;
  color: #fff;
}
.subtitle {
  font-family: Inter;
  font-size: 32px;
  font-weight: 500;
  color: #fff;
}
</style>
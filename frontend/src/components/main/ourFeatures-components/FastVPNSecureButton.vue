<script setup>
</script>

<template lang="pug">
v-btn.button-fast-secure()
    .fast-vpn-secure FAST & <br>  VPN SECURE
    v-img.verify(
    aspect-ratio='1/1' 
    cover='' 
    src='../../../assets/icons/verify.png') 
</template>

<style scoped>
.button-fast-secure {
    height: 6.5rem;
    border-radius: 9px;
    background-color: #fff8e4;
}
.fast-vpn-secure {
    font-size: 24px;
    font-weight: 900;
    letter-spacing: normal;
    color: rgba(255, 211, 85, 0.85);
}
.verify {
    width: 4rem;
    height: 4rem;
}
</style>


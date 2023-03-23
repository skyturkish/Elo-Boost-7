<script setup>
</script>

<template lang="pug">
v-btn.button-boost-rank()
    .boost-rank BOOST <br> RANK!
    v-img.monitor(
    aspect-ratio='1/1' 
    cover='' 
    src='../../../assets/icons/monitor.png') 
</template>

<style scoped>
.button-boost-rank {
    height: 6.5rem;
    border-radius: 9px;
    background-color: #ffe3e3;
}
.boost-rank {
    font-size: 24px;
    font-weight: 900;
    letter-spacing: normal;
    color: rgba(249, 132, 132, 0.85);
}
.monitor {
    width: 4rem;
    height: 4rem;
}
</style>


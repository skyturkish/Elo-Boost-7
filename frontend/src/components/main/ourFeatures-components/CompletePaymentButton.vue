<script setup>
</script>

<template lang="pug">
v-btn.button-complete-payment()
    .complete-payment COMPLETE <br> PAYMENT
    v-img.wallet(
    aspect-ratio='1/1' 
    cover='' 
    src='../../../assets/icons/wallet.png') 
</template>

<style scoped>
.button-complete-payment {
    height: 6.5rem;
    border-radius: 9px;
    background-color: #eafff4;
}
.complete-payment {
    font-size: 24px;
    font-weight: 900;
    letter-spacing: normal;
    color: rgba(70, 184, 124, 0.5);
}
.wallet {
    width: 4rem;
    height: 4rem;
}
</style>


<script setup>
</script>

<template lang="pug">
v-btn.button-select-service()
    .select-service SELECT <br> SERVICE
    v-img.double-click(
    aspect-ratio='1/1' 
    cover='' 
    src='../../../assets/icons/double-click.png') 
</template>

<style scoped>

.button-select-service {
    height: 6.5rem;
    border-radius: 9px;
    background-color: #f5eeff;
}
.select-service {
    font-size: 24px;
    font-weight: 900;
    letter-spacing: normal;
    color: rgba(202, 166, 255, 0.85);
}
.double-click {
    width: 4rem;
    height: 4rem;
}
</style>


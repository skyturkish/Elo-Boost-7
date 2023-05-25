<script setup>
</script>

<template lang="pug">
.settings
  v-icon(icon="mdi-cog" color="#444")

</template>

<style scoped>
.settings {
    width: 50px;
    height: 50px;
    border-radius: 15px;
    background-color: #e4e6e7;
    cursor: pointer;
}
.v-icon {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

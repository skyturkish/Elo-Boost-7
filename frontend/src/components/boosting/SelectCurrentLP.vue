<script setup>

</script>

<template lang="pug">
v-select.selection(
    label="Current LP"
    :items="['100-80', '80-60', '60-40','40-20','20-0']"
    variant="solo"
    )
</template>

<style scoped>
.selection {
    width: 13rem;
}
</style>

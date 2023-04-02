<script setup>

</script>

<template lang="pug">
v-select.selection(
    label="Server"
    :items="['Turkey','China']"
    variant="solo"
    )
</template>

<style scoped>
.selection {
    width: 13rem;
}
</style>

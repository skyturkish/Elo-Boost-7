<script>

</script>

<template lang="pug">
button
  .icon
    v-img(src='@/assets/icons/checkmark.png' width="40px")
</template>

<style scoped>
button {
  width: 140px;
  height: 51px;
 --glow-color: rgb(70, 155, 113);
 --glow-spread-color: rgba(68, 148, 99, 0.781);
 --enhanced-glow-color: rgb(27, 75, 29);
 --btn-color: rgb(37, 85, 57);
 color: var(--glow-color);
 font-size: 15px;
 font-weight: bold;
 background-color: var(--btn-color);
 border-radius: 1em;
 outline: none;
 box-shadow: 0 0 1em .25em var(--glow-color),
        0 0 4em 1em var(--glow-spread-color),
        inset 0 0 .75em .25em var(--glow-color);
 text-shadow: 0 0 .5em var(--glow-color);
 position: relative;
 transition: all 0.3s;
 display: flex;
align-items: center;
justify-content: center;
}

button:hover {
 color: var(--btn-color);
 background-color: var(--glow-color);
 box-shadow: 0 0 1em .25em var(--glow-color),
        0 0 4em 2em var(--glow-spread-color),
        inset 0 0 .75em .25em var(--glow-color);
}

button:active {
 box-shadow: 0 0 0.6em .25em var(--glow-color),
        0 0 2.5em 2em var(--glow-spread-color),
        inset 0 0 .5em .25em var(--glow-color);
}
</style>
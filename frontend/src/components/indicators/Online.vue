<script setup>

</script>

<template>
<div class="container">
  <div class="online-indicator">
    <span class="blink"></span>
  </div>
</div>
</template>

<style scoped>
body {
  font-family: 'Rubik', sans-serif;
  padding: 0;
  margin: 0;
}

div.container {
  width: 1rem;
  height: 1rem;
  border-radius: 10px;
  margin-left: -8px;
  margin-bottom: -8px;
  z-index: 1;
}

div.online-indicator {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 10px;
  background-color: #0fcc45;
  border-radius: 50%;
  position: relative;
}
span.blink {
  display: block;
  width: 15px;
  height: 15px;

  background-color: #0fcc45;
  opacity: 0.7;
  border-radius: 50%;

  animation: blink 1s linear infinite;
}

/*Animations*/

@keyframes blink {
  100% { transform: scale(2, 2);
          opacity: 0;
        }
}
</style>

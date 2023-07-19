<script>

</script>
<template>
<div class="card">
<slot>
</slot>
</div>
</template>

<style scoped>
.card {
  box-sizing: border-box;
  width: 260px;
  height: 341px;
  background: #FBFBFB;
  border-radius: 17px;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  user-select: none;
  color: black;
  background-color: #fbfbfb;
}

.card:hover {
  transform: scale(1.05);
}

.card:active {
  transform: scale(0.95) rotateZ(1.7deg);
}

</style>
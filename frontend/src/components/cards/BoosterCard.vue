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
  width: 270px;
  height: 375px;
  background: rgba(217, 217, 217, 0.58);
  border: 1px solid white;
  box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
  border-radius: 17px;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  user-select: none;
  color: black;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #fbfbfb;
  padding: 2rem 1.5rem 1rem 1.5rem;
}

.card:hover {
  border: 1px solid black;
  transform: scale(1.05);
}

.card:active {
  transform: scale(0.95) rotateZ(1.7deg);
}

</style>
<template>
  <div class="loader"></div>
</template>

<style scoped>
.loader {
  border: 5px solid grey;
  border-radius: 50%;
  border-top: 7px solid white;
  width: 20px;
  height: 20px;
  -webkit-animation: spin 0.5s linear infinite; /* Safari */
  animation: spin 0.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
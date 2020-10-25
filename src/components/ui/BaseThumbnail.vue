<template>
  <div class="col-sm-12">
    <div class="thumbnail">
      <img :src="photoUrl" class="img-circle" alt="..." />
      <div class="caption">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["photoUrl"],
};
</script>
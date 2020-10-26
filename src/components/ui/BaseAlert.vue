<template>
  <div :class="className" role="alert">
      <slot></slot>
  </div>
</template>
<script>
export default {
  name: "BaseAlert",
  props: ["type"],
  computed: {
    className() {
      var className = null;
      switch (this.type) {
        case "warning":
          className = "alert alert-warning";
          break;

        case "primary":
          className = "alert alert-primary";
          break;

        case "info":
          className = "alert alert-info";
          break;

        case "success":
          className = "alert alert-success";
          break;

        case "danger":
          className = "alert alert-danger";
          break;

        default:
          className = "alert alert-default";
          break;
      }

      return className;
    },
  },
};
</script>;
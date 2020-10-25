<template>
  <div>
    <div :class="className">
      <div class="panel-heading">
        <h3 class="panel-title"><em v-if="icon" :class="icon"></em> {{ title }}</h3> 
      </div>
      <div class="panel-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BaseCard",
  props: ["title", "type", "icon"],
  computed: {
    className() {
      var className = null;
      switch (this.type) {
        case "warning":
          className = "panel panel-warning";
          break;

        case "primary":
          className = "panel panel-primary";
          break;

        case "info":
          className = "panel panel-info";
          break;

        case "success":
          className = "panel panel-success";
          break;

        case "danger":
          className = "panel panel-danger";
          break;

        default:
          className = "panel panel-default";
          break;
      }

      return className;
    },
  },
};
</script>;
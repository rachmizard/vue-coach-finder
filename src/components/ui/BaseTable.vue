<template>
  <table aria-describedby="Table" :class="classTable">
    <thead>
      <tr>
        <th v-for="(column, index) in columns" :key="index" scope>
          {{ column }}
        </th>
      </tr>
    </thead>
    <tbody>
        <slot></slot>
    </tbody>
  </table>
</template>
<script>
export default {
  props: ["type", "columns"],
  computed: {
    classTable() {
      let className = "";
      switch (this.type) {
        case "striped":
          className = "table table-striped";
          break;

        case "border":
          className = "table table-bordered";
          break;

        case "hover":
          className = "table table-hover";
          break;

        case "condensed":
          className = "table table-condensed";
          break;

        default:
          className = "table table-striped";
          break;
      }
      return className;
    },
  },
};
</script>
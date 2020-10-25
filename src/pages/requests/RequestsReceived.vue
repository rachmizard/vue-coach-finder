<template>
  <div>
    <base-card title="Requests">
      <base-table type="hover" :columns="columns">
        <tr v-for="(data, index) in data" :key="index">
          <td>{{ data.id }}</td>
          <td>{{ data.userEmail }}</td>
          <td>{{ data.coachId }}</td>
          <td>{{ data.message }}</td>
        </tr>
      </base-table>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        'ID',
        'Email',
        'Coach ID',
        'Message'
      ]
    }
  },
  computed: {
    data() {
      return this.$store.getters.getRequests
    }
  }
}
</script>
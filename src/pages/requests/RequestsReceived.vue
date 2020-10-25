<template>
  <div>
    <base-card title="Requests">
      <base-table type="striped" :columns="columns">
        <tr v-for="(data, index) in data" :key="index">
          <td>{{ data.id }}</td>
          <td>{{ data.userEmail }}</td>
          <td>
            <base-button link :to="redirectCoachDetail(data.coach.id)">{{ data.coach.firstName + ' ' + data.coach.lastName }}</base-button>
          </td>
          <td>{{ data.message }}</td>
          <td>{{ data.isPaid ? 'Yes' : 'No' }}</td>
          <td>{{ data.isAccepted ? 'Yes' : 'No' }}</td>
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
        'Coach Name',
        'Message',
        'Paid',
        'Accept'
      ]
    }
  },
  computed: {
    data() {
      return this.$store.getters.getRequests
    }
  },
  methods: {
    redirectCoachDetail(id) {
      return '/coaches/' + id;
    }
  }
}
</script>
<template>
  <div v-if="!reservations.length">
    <br><br>
    <h2><b>There are no reservations..</b></h2>
  </div>
  <div v-else>
    <div>
      <h2>Upcoming Reservations</h2>
      <br />

      <table>
        <tr>
          <th>Reservation ID</th>
          <th>Date</th>
          <th>Price</th>
          <th></th>
        </tr>
        <tr v-for="reservation in reservations" :key="reservation.id">
          <td>{{ reservation._id }}</td>
          <td>{{ reservation.start_date }}</td>
          <td>{{ reservation.total_price }}</td>
          <td>
            <button class="deletebtn" @click="cancel(reservation._id)">Cancel Reservation</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    document.title = "Service Reservations"
  },
  props: ['id'],
  data() {
    return {
      reservations: [],
    };
  },
  mounted() {
    this.getReservation();
  },
  methods: {
    getReservation() {
      axios
        .post("https://reservo-r.herokuapp.com/reservation/view_reservations", {
          id: localStorage.getItem("user-info"),
          serviceid: this.$route.params.id

        })
        .then(response => {
          this.reservations = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    cancel(id) {
      axios
        .post("https://reservo-r.herokuapp.com/reservation/delete_reservation", {
          id: id
        })
        .catch(error => {
          console.log(error);
        });
      this.$router.push('/my_services')
    }
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  padding-left: 20%;
  float: center;
}

th,
td {
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.deletebtn {
  background-color: darkred;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 70%;
  opacity: 0.9;
  height: 30%;
}

.deletebtn:hover {
  opacity: 1;
}

div {
  padding: 5%;
}
</style>
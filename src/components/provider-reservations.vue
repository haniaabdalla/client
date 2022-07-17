<template>
  <div v-if="!reservations.length">
  <br><br>
    <h2><b>There are no reservations..</b></h2>
  </div>
  <div v-else>
    <div>
      <div class="row">
        <div class="leftcolumn">
          <div v-for="reservation in reservations" :key="reservation.id" class="card">
            <h2>{{ reservation.start_date }} - {{ reservation.end_date }}</h2>
            <h5>Status: Pending</h5>
            <h5>Total Price: {{ reservation.total_price }}</h5>
            <button @click="cancel(reservation._id)">Cancel Reservation</button>
          </div>
        </div>
      </div>
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
        .post("https://resservo.herokuapp.com/reservation/view_reservations", {
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
        .post("https://resservo.herokuapp.com/reservation/delete_reservation", {
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
* {
  box-sizing: border-box;
}

body {
  font-family: Arial;
  padding: 10px;
  background: #f1f1f1;
}

button {
  background-color: #4d4c7d;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 30%;
  opacity: 0.9;
}

button:hover {
  opacity: 1;
}

.card {
  background-color: white;
  padding: 20px;
  margin-top: 20px;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}


</style>
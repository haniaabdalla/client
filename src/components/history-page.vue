<template>
  <div v-if="!reservations.length">
        <br><br>
        <h2><b>There are no reservations..</b></h2>
      </div>
      <div v-else>
    <div>
      <h2>Reservation History</h2>
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
            <div v-if="check(reservation.service_id) == false">
              <button class="submitbtn" @click="goto(reservation.service_id)">Rate</button>
            </div>
            <div v-else>
              <button class="deletebtn">Already Rated</button>
            </div>
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
    document.title = "Reservation History"
  },
  data() {
    return {
      form: {
        rating: "",
        review: ""
      },
      reservations: [],
      checking: false,
      ratings: []
    };
  },
  mounted() {
    this.gethistory();
  },
  methods: {
    goto(id) {
      this.$router.push({ name: "rate", params: { id: id } });
    },
    gethistory() {
      axios
        .post("https://reservo-r.herokuapp.com/reservation/view_history", {
          id: localStorage.getItem("user-info")
        })
        .then(response => {
          this.reservations = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    check(id) {
      axios
        .post("https://reservo-r.herokuapp.com/rating/ViewUserRating", {
          user_id: localStorage.getItem("user-info"),
          service_id: id
        })
        .then(response => {
          this.checking = response.data;

          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
      return this.checking;
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

.submitbtn {
  background-color: darkgreen;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 70%;
  opacity: 0.9;
  height: 30%;
}

.submitbtn:hover {
  opacity: 1;
}

div {
  padding: 5%;
}


</style>
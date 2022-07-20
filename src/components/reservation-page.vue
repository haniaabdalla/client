<template>
  <div class="container">
    <h2>{{ services.name }}</h2>
    <div class="card">
      <h2>Working Days</h2>
      <div v-for="hour in hours" :key="hour.id">
        <p> {{ hour.day }} from: {{ hour.from }} to: {{ hour.to }}</p>
      </div>
    </div>

    <div class="card">
      <h2>Enter your reservation time.</h2>
      <label for="from">
        <b>From</b>
      </label>
      <input type="time" placeholder="from" name="from" id="from" v-model="form.from" />

      <label for="to">
        <b>To</b>
      </label>
      <input type="time" placeholder="to" name="to" id="to" v-model="form.to" />

      <label for="start">
        <b>Start Date</b>
      </label>
      <input type="date" placeholder="start date" name="start" id="start" v-model="form.start_date" />
      <label for="end">
        <b>End Date</b>
      </label>
      <input type="date" placeholder="end date" name="end" id="end" v-model="form.end_date" />
      <br />
      <button @click="AddReservation()" class="registerbtn">Reserve</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    document.title = "Reserve";
  },
  props: ["id"],
  data() {
    return {
      form: {},
      errors: [],
      hours: [],
      reservation: [],
      services: []
    };
  },
  mounted() {
    this.getService();
    this.getHours();
  },
  methods: {
    getHours() {
      axios
        .post("https://reservo-r.herokuapp.com/hours/view", {
          id: this.$route.params.id
        })
        .then(response => {
          this.hours = response.data;
          console.log(this.hours);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getService() {
      axios
        .post("https://reservo-r.herokuapp.com/services/service", {
          id: this.$route.params.id
        })
        .then(response => {
          this.services = response.data;
          console.log(this.services);
        })
        .catch(error => {
          console.log(error);
        });
    },
    AddReservation() {
      axios
        .post("https://reservo-r.herokuapp.com/reservation/add_reservation", {
          user_id: localStorage.getItem("user-info"),
          service_id: this.$route.params.id,
          from: this.form.from,
          to: this.form.to,
          start_date: this.form.start_date,
          end_date: this.form.end_date
        })
        .then(response => {
          this.reservation = response.data;
          this.$router.push({ name: "pay", params: { id: this.reservation._id } })
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  padding: 16px;
}

input[type="text"],
input[type="time"],
input[type="date"],
option,
select,
option:disabled {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
  float: center;
}

input[type="text"]:focus,
input[type="time"]:focus,
input[type="date"]:focus,
option:focus,
select:focus {
  background-color: #ddd;
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

.registerbtn {
  background-color: #4d4c7d;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
  float: center;
}

.card {
  background-color: white;
  padding: 20px;
  margin-top: 20px;
  float: center;
}

.registerbtn:hover {
  opacity: 1;
}

a {
  color: dodgerblue;
}
</style>

 
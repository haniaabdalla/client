<template>
  <div>
    <div class="about-section">
      <h1>About Us</h1>
      <p>
        The Objective of our system is to allow potential customers to self-reserve, securely store customer’s data,
        manage your staff and keep your business running long after
        you’ve gone home for the day. An online Reservation system is so much more than just a piece
        of software that reserves an appointment with your business.
      </p>
      <p>Register as a service provider to propose your services or as a customer to make reservations.</p>
    </div>
    <h2 style="text-align:center">Our Team</h2>
    <div class="row">
      <div class="column" v-for="admin in admins" :key="admin.id">
        <div class="card">
          <div class="container">
            <h2>{{ admin.name }}</h2>
            <p class="title">Admin</p>
            <p>Contact Mail:</p>
            <p>{{ admin.email }}</p>
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
    document.title = "About Us";
  },

  data() {
    return {
      admins: []
    };
  },
  mounted() {
    this.getAdmins();
  },
  methods: {
    getAdmins() {
      axios.get("https://reservo-r.herokuapp.com/user/admins").then(response => {
        this.admins = response.data;
        console.log(response.data);
      });
    }
  }
};
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

.column {
  float: left;
  width: 33.3%;
  margin-bottom: 16px;
  padding: 0 8px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 8px;
}

.about-section {
  padding: 50px;
  text-align: center;
  background-color: #474e5d;
  color: white;
}

.container {
  padding: 0 16px;
}

.container::after,
.row::after {
  content: "";
  clear: both;
  display: table;
}

.title {
  color: grey;
}

.button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
}

.button:hover {
  background-color: #555;
}

@media screen and (max-width: 650px) {
  .column {
    width: 100%;
    display: block;
  }
}
</style>
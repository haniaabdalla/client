<template>
  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div v-if="this.role == 'Service Provider'">
      <div class="topnav">
        <a href="/">Home</a>
        <a href="/propose_service">Propose</a>
        <a href="/my_services">My Services</a>
        <a href="/logout" style="float:right">Logout</a>
        <a href="/profile" style="float:right">Profile</a>

      </div>
    </div>
    <div v-else-if="this.role == 'Customer'">
      <div class="topnav">
        <a href="/">Home</a>
        <a href="/myfavorites">Favorites</a>
        <a href="/history">History</a>
        <a href="/upcoming">Upcoming Reservations</a>

        <a href="/logout" style="float:right">Logout</a>
        <a href="/profile" style="float:right">Profile</a>
        <a href="/notify" style="float:right">
          <i class="fa fa-bell" aria-hidden="true"></i></a>

      </div>
    </div>
    <div v-else-if="this.role == 'Admin'">
      <div class="topnav">
        <a href="/">Home</a>
        <a href="/add_admin">Add Admin</a>
        <a href="/proposed_services">Proposed</a>
        <a href="/add_category">Categories</a>
        <a href="/service_providers">Service Providers</a>
        <a href="/customers">Customers</a>
        <a href="/logout" style="float:right">Logout</a>
        <a href="/profile" style="float:right">Profile</a>

      </div>
    </div>
    <div v-else-if="this.role == 'Guest'">
      <div class="topnav">
        <a href="/">Home</a>
        <a href="/register" style="float:right">Register</a>
        <a href="/login" style="float:right">Login</a>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      role: ""
    };
  },
  mounted() {
    this.myMethod();
  },
  methods: {
    async myMethod() {
      console.log(localStorage.getItem("user-info"))
      if (localStorage.getItem("user-info") == null) {
        this.role = "Guest";
      }
      else {
        await axios
          .post("https://resservo.herokuapp.com/user/roles", {
            id: localStorage.getItem("user-info")
          })
          .then(response => (this.role = response.data)); console.log(this.role)
      }
    }
  }
};
</script>

<style scoped>
.topnav {
  overflow: hidden;
  background-color: #4d4c7d;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.topnav a:hover {
  background-color: #ddd;
  color: #4d4c7d;
}
</style>

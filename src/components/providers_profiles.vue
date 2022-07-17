<template>
  <div>

    <h2>Service Providers' Accounts</h2>
    <p>Delete user by pressing the button..</p>
    <br>
    <table>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th></th>
      </tr>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>
          <button @click="deleteuser(user._id)" class="deletebtn">Delete</button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>import axios from "axios";

export default {
  created() {
    document.title = "Providers"
  },
  data() {
    return {
      users: []
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      axios
        .get("https://resservo.herokuapp.com/user/allProviders")
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteuser(id) {
      console.log(id)
      axios
        .post("https://resservo.herokuapp.com/user/delete_user", {
          id: id
        })
        .then(response => {
          console.log(response.data);
        })
      this.$router.go()
    },
  }

}
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
  height: 30%
}

.deletebtn:hover {
  opacity: 1;
}

div {
  padding: 5%
}
</style>
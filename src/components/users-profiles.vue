<template>
  <div>
    <h2>Customers' Accounts</h2>
    <p>Give golden badge by pressing the button..</p><br>

    <table>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th></th>
      </tr>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td v-if="user.customer_loyalty == true">
          <button class="deletebtn" @click="remove(user._id)">Remove Badge</button>
        </td>
        <td v-else>
          <button class="submitbtn" @click="update(user._id)">Give Badge</button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>import axios from "axios";

export default {
  created() {
    document.title = "Customers"
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
        .get("https://resservo.herokuapp.com/user/allCustomers")
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    update(id) {
      axios
        .post("https://resservo.herokuapp.com/user/update_loyalty", {
          customer_id: id
        }).then(response => {
          console.log(response.data);
        })
      this.$router.go()
    },
    remove(id) {
      axios
        .post("https://resservo.herokuapp.com/user/remove_loyalty", {
          customer_id: id
        }).then(response => {
          console.log(response.data);
        })
      this.$router.go()
    }
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


.submitbtn {
  background-color: darkgreen;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 70%;
  opacity: 0.9;
  height: 30%
}

.submitbtn:hover {
  opacity: 1;
}

div {
  padding: 5%
}
</style>
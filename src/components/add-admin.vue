<template>
  <div class="container">
    <h1>Add Admin</h1>
    <p>Please fill in this form to create an admin account.</p>
    <hr />
    <label for="name">
      <b>Name</b>
    </label>
    <br />
    <input type="text" placeholder="Enter Name" name="name" id="name" v-model="form.name" />
    <br />
    <label for="email">
      <b>Email</b>
    </label>
    <br />
    <input type="text" placeholder="Enter Email" name="email" id="email" v-model="form.email" />
    <br />
    <label for="phone">
      <b>Phone</b>
    </label>
    <br />
    <input type="text" placeholder="Enter Phone" name="phone" id="phone" v-model="form.phone" />
    <br />

    <label for="pswd">
      <b>Password</b>
    </label>
    <br />
    <input type="password" placeholder="Enter Password" name="pswd" id="pswd" v-model="form.pswd" />
    <br />
    <hr />
    <button @click="register()" class="registerbtn">Add Admin</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    document.title = "Add Admin"
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        name: "",
        phone: ""
      },
      errors: []
    };
  },
  methods: {
    async register() {
      axios.post("https://reservo-r.herokuapp.com/user/register", {
        email: this.form.email,
        password: this.form.pswd,
        name: this.form.name,
        phone: this.form.phone,
        type: "Admin"
      });
      this.$router.push("/");
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
input[type="password"] {
  width: 50%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="text"]:focus,
input[type="password"]:focus {
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
  width: 50%;
  opacity: 0.9;
}

.registerbtn:hover {
  opacity: 1;
}

a {
  color: dodgerblue;
}
</style>
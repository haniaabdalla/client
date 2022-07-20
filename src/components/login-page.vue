<template>

  <div class="container">

    <h1>Login</h1>
    <p>Please fill in this form with your credentials.</p>
    <hr />
    <label for="email">
      <b>Email</b>
    </label>
    <br />
    <input type="text" placeholder="Enter Email" name="email" required v-model="form.email" />
    <br />

    <label for="password">
      <b>Password</b>
    </label>
    <br />
    <input type="password" placeholder="Enter Password" name="password" required v-model="form.password" />
    <br />
    <hr />
    <button @click="login()">Login</button>
    <br />
    <label>
      <input type="checkbox" checked="checked" name="remember" /> Remember me
    </label>
    <br />
    <p>
      Don't have an account?
      <router-link to="/register" class="text-2xl underline hover:text-blue-500 transision">Register</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    document.title = "Login"
  },
  name: "login-page",
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      axios
        .post("https://reservo-r.herokuapp.com/user/login", {
          email: this.form.email,
          password: this.form.password
        })
        .then(response => {
          console.log(response.data);
          if (response.data == "Email or password isn't correct.") {
            window.alert("Email or password isn't correct.");
            this.$router.go()
          } else {
            localStorage.setItem("user-info", response.data);
            this.$router.push("/");
          }
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

label {
  text-align: left;
}

input[type="text"],
input[type="password"],
option,
select {
  width: 50%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="text"]:focus,
input[type="password"]:focus,
option:focus,
select:focus {
  background-color: #ddd;
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

button {
  background-color: #4d4c7d;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 50%;
  opacity: 0.9;
}

button:hover {
  opacity: 1;
}

a {
  color: dodgerblue;
}
</style>
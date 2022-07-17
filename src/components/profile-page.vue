<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="card">
      <div class="upper">
        <img src="https://i.imgur.com/Qtrsrk5.jpg" class="img-fluid" />
      </div>

      <div class="user text-center">
        <div class="profile">
          <img v-bind:src=user.image class="rounded-circle" width="80" />
        </div>
      </div>

      <div class="mt-5 text-center">
        <h4 class="mb-0">{{ user.name }}</h4>
        <span class="text-muted d-block mb-2">{{ user.type }}</span><br>
        <input type="text" placeholder="Enter New Name" name="name" id="name" v-model="form.name" /><br>
        <button class="btn btn-primary btn-sm follow" @click="EditName()">Edit</button>

        <div class="d-flex justify-content-between align-items-center mt-4 px-4">
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
export default {
  created() {
    document.title = "My Profile";
  },
  data() {
    return {
      form: {
        name: ""
      },
      user: [],
      image: null
    };
  },
  mounted() {
    this.viewInfo();
  },
  methods: {
    viewInfo() {
      axios
        .post("https://resservo.herokuapp.com/user/info", {
          id: localStorage.getItem("user-info")
        })
        .then(response => {
          this.user = response.data;
          console.log(response.data.image);
        })
        .catch(error => {
          console.log(error);
        });
    },
    EditName() {
      axios.post("https://resservo.herokuapp.com/user/update_user", {
        id: localStorage.getItem("user-info"),
        name: this.form.name
      });
      this.$router.go()
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:weight@100;200;300;400;500;600;700;800&display=swap");

body {
  background-color: #545454;
  font-family: "Poppins", sans-serif;
  font-weight: 300;
}

.container {
  height: 100vh;
}

.card {
  width: 380px;
  border: none;
  border-radius: 15px;
  padding: 8px;
  background-color: #fff;
  position: relative;
  height: 370px;
}

.upper {
  height: 100px;
}

.upper img {
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.user {
  position: relative;
}

.profile img {
  height: 80px;
  width: 80px;
  margin-top: 2px;
}

.profile {
  position: absolute;
  top: -50px;
  left: 38%;
  height: 90px;
  width: 90px;
  border: 3px solid #fff;

  border-radius: 50%;
}

.container {
  padding: 16px;
}

input[type="text"],
input[type="time"],
input[type="file"],
option,
select,
option:disabled {
  width: 50%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="text"]:focus,
input[type="time"]:focus,
input[type="file"]:focus,
option:focus,
select:focus {
  background-color: #ddd;
  outline: none;
}

.follow {
  background-color: #4d4c7d;
  border-radius: 15px;
  padding-left: 20px;
  padding-right: 20px;
  height: 35px;
  color: white;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  opacity: 0.9;

}

.follow:hover {
  opacity: 1;
}
</style>
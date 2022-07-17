<template>
  <div v-if="!services.length">
  <br><br>
    <h2><b>There are no services..</b></h2>
  </div>
  <div v-else>
    <div>
      <div class="row">
        <div class="leftcolumn" v-for="service in services" :key="service.id">
          <div class="card">
            <img v-bind:src=service.image class="fakeimg" style="height:200px;" />
            <h2>{{ service.name }}</h2>
            <h5>{{ service.price }}</h5>
            <p>{{ service.category }}</p>
            <p>{{ service.description }}</p>
            <button @click="accept(service._id)" class="registerbtn">Accept</button>
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
    document.title = "Proposed Services"
  },
  data() {
    return {
      services: []
    };
  },
  mounted() {
    this.getServices();
  },
  methods: {
    getServices() {
      axios
        .post("https://resservo.herokuapp.com/services/proposed_services", {
          user_id: localStorage.getItem("user-info")
        })
        .then(response => {
          this.services = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    accept(id) {
      axios
        .put("https://resservo.herokuapp.com/services/proposed_services", {
          id: id
        });
      window.alert("Service accepted.");
      this.$router.go();
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

.leftcolumn {
  float: left;
  width: 80%;
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
  align-self: center
}

.registerbtn:hover {
  opacity: 1;
}

.fakeimg {
  background-color: #aaa;
  width: 100%;
  padding: 20px;
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

.leftcolumn {
  margin: 100px auto 0;
  width: 400px;
  height: 600px;
  perspective: 700px;
  float: left;
}


</style>
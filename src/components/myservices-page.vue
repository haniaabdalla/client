<template>
  <div v-if="!services.length">
  <br><br>
    <h2><b>There are no services..</b></h2>
  </div>
  <div v-else>
    <div>
      <div class="row">
        <div v-for="service in services" :key="service.id" class="leftcolumn">
          <div class="card">
            <h2>{{ service.name }}</h2>
            <img v-bind:src=service.image style="height:200px" @click="goto2(service._id)" />
            <h5>{{ service.price }}</h5>
            <p></p>
            <p>{{ service.description }}</p>
            <button @click="goto(service._id)">Show Reservations</button>

            <button @click="goto3(service._id)">Add Working Hours</button>
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
    document.title = "My Services"
  },
  data() {
    return {
      services: []
    };
  },
  mounted() {
    this.myservices();
  },
  methods: {
    goto(id) {
      this.$router.push({ name: 'ProviderReservation', params: { id: id } });
    },
    goto2(id) {
      this.$router.push({ name: 'ServiceCard', params: { id: id } });
    },
    goto3(id) {
      this.$router.push({ name: 'working_hours', params: { id: id } });
    },
    myservices() {
      axios
        .post("https://resservo.herokuapp.com/services/view_my_services", {
          id: localStorage.getItem("user-info")
        })
        .then(response => {
          this.services = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
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

button {
  background-color: #4d4c7d;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

button:hover {
  opacity: 1;
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
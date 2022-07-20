<template>

  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

    <div class="example">
      <input type="text" placeholder="Search.." name="search" v-model="search" />
      <button type="submit" @click="search1()">
        <i class="fa fa-search"></i>
      </button>
    </div><br>

    <div class="inline" id="myBtnContainer">
      <p>Filter by Category</p>
      <hr>
      <button class="btn" @click="getServices()">Show all</button>
      <div class="inline2" v-for="category in categories" :key="category.id">
        <button class="btn" @click="getByCategory(category.name)">{{ category.name }}</button>
      </div>
    </div>

    <div>
      <div v-if="!services.length">
        <br><br>
        <h2><b>There are no services in this category..</b></h2>
      </div>
      <div v-else>
        <div class="row">
          <div v-for="service in services" :key="service.id" class="leftcolumn">
            <div class="card">
              <div class="header">
                <h2>{{ service.name }}</h2>
                <hr>
              </div>
              <img v-bind:src="service.image" style="height:200px" @click="goto(service._id)" /><br>
              <h5>Price: £ {{ service.price }}</h5>
              <p></p>
              <p>{{ service.description }}</p>
              <hr>
              <div class="inline2" v-if="this.role == 'Customer'">
                <button class="clickbtn" @click="addfav(service._id)">Love</button>
                <button @click="reserve(service._id)" class="clickbtn">Reserve</button>
              </div>
              <div v-else></div>
            </div>
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
    document.title = "Home"
  },
  data() {
    return {
      search: "",
      services: [],
      categories: [],
      role: []
    };
  },
  mounted() {
    this.getCategories();
    this.getServices();
    this.myMethod();
  },
  methods: {
    search1() {
      axios
        .post("https://reservo-r.herokuapp.com/services/search", {
          serviceName: this.search
        })
        .then(response => {
          this.services = response.data;
        });
    },
    goto(id) {
      this.$router.push({ name: "ServiceCard", params: { id: id } });
    },
    reserve(id) {
      this.$router.push({ name: "reserve", params: { id: id } });
    },
    addfav(id) {
      console.log(id);
      let favservice = axios.post("https://reservo-r.herokuapp.com/fav/add_favorite", {
        service_id: id,
        user_id: localStorage.getItem("user-info")
      });
      if (favservice == 200) {
        console.log("Service added to favorites.");
      }
    },
    getServices() {
      axios
        .get("https://reservo-r.herokuapp.com/services")
        .then(response => {
          this.services = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getByCategory(name) {
      axios
        .post("https://reservo-r.herokuapp.com/services/find_by_category", {
          name: name
        })
        .then(response => {
          this.services = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCategories() {
      axios
        .get("https://reservo-r.herokuapp.com/categories")
        .then(response => {
          this.categories = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    myMethod() {
      console.log(localStorage.getItem("user-info"));
      if (localStorage.getItem("user-info") == null) {
        this.role = "Guest";
      } else {
        console.log("hania");
        axios
          .post("https://reservo-r.herokuapp.com/user/roles", {
            id: localStorage.getItem("user-info")
          })
          .then(response => (this.role = response.data));
        console.log(this.role);
      }
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  background-color: #f1f1f1;
  padding: 20px;
  font-family: Arial;
}

.card {
  background-color: white;
  padding: 20px;
  margin-top: 20px;
}

h1 {
  font-size: 50px;
  word-break: break-all;
}

.inline {
  display: inline-block;
  border-bottom: 1px solid;
}

.inline2 {
  display: inline-block;
}

.row {
  margin: 8px -16px;
}

.example input[type="text"] {
  padding: 10px;
  font-size: 17px;
  border: 1px solid grey;
  float: left;
  width: 80%;
  background: #f1f1f1;
}

.example button {
  float: left;
  width: 20%;
  padding: 10px;
  background: #4d4c7d;
  color: white;
  font-size: 17px;
  border: 1px solid grey;
  border-left: none;
}

.example button:hover {
  background: #4d4c7d;
}

.example::after {
  content: "";
  clear: both;
  display: table;
}

.row,
.row>.column {
  padding: 8px;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

.btn {
  border: none;
  outline: none;
  background-color: white;
  cursor: pointer;
  display: inline-block;
  width: 130px;
}

.btn:hover {
  background-color: #ddd;
}

.btn.active {
  background-color: #666;
  color: white;
}

.leftcolumn {
  margin: 100px auto 0;
  width: 400px;
  height: 600px;
  perspective: 700px;
  float: left;
}

.clickbtn {
  background-color: #4d4c7d;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.deletebtn2 {
  margin-left: 20px;
  background-color: #4d4c7d;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 30%;
  opacity: 0.9;
}

.deletebtn:hover {
  opacity: 1;
}

.clickbtn:hover {
  opacity: 1;
}

img {
  height: 300px;
}
</style>
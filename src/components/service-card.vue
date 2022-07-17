<template>
  <div>
    <div>
      <div class="card">
        <h2>{{ services.name }}</h2>
        <hr>
        <img v-bind:src="services.image" class="fakeimg" style="height:200px;" /><br>
        <h5>Price: £ {{ services.price }}</h5>
        <p></p>
        <p>{{ services.description }}</p>
        <div v-if="this.role == 'Customer'">
          <button class="clickbtn" @click="addfav(service._id)">Love</button>
          <button @click="reserve(service._id)" class="clickbtn">Reserve</button>
        </div>
        <div v-else></div>
        <hr />
      </div>

    </div>
    <div class="card">
      <hr />
      <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <h3>Ratings and Reviews</h3>
      <table>
        <tr>
          <th>Rating</th>
          <th>Review</th>
        </tr>
        <tr v-for="rating in ratings" :key="rating.id">
          <td>
            <span class="fa fa-star checked"></span>
            {{ rating.rating }}
          </td>
          <td>{{ rating.review }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    document.title = "Service Card"
  },
  props: ['id'],
  data() {
    return {
      services: [],
      ratings: [],
      role: ''
    };
  },
  mounted() {
    this.getService();
    this.getReviews();
    this.myMethod()
  },
  methods: {
    getService() {
      axios
        .post("https://resservo.herokuapp.com/services/service", {
          id: this.$route.params.id
        })
        .then(response => {
          this.services = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getReviews() {
      axios
        .post("https://resservo.herokuapp.com/rating/ViewRatingsAndReview", {
          ServiceID: this.$route.params.id
        })
        .then(response => {
          this.ratings = response.data;
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
          .post("https://resservo.herokuapp.com/user/roles", {
            id: localStorage.getItem("user-info")
          })
          .then(response => (this.role = response.data));
        console.log(this.role);
      }
    },
    addfav(id) {
      console.log(id);
      let favservice = axios.post("https://resservo.herokuapp.com/fav/add_favorite", {
        service_id: id,
        user_id: localStorage.getItem("user-info")
      });
      if (favservice == 200) {
        console.log("Service added to favorites.");
      }
    },
    reserve(id) {
      this.$router.push({ name: "reserve", params: { id: id } });
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

.fakeimg {
  background-color: #aaa;
  width: 50%;
  padding: 20px;
  float: center;
  align-self: center
}

.card {
  background-color: white;
  padding: 20px;
  margin-top: 20px;
}

.checked {
  color: yellow;
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

.clickbtn:hover {
  opacity: 1;
}
</style>


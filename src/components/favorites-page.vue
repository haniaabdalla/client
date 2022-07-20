<template>
  <div v-if="!favorites.length">
  <br><br>
    <h2><b>There are no favorites..</b></h2>
  </div>
  <div v-else>
    <div class="row">
      <div v-for="favorite in favorites" :key="favorite.id" class="leftcolumn">
        <div class="card">
          <div class="header">
            <h2>{{ favorite.service_name }}</h2>
          </div>
          <img v-bind:src="favorite.service_image" style="height:200px" @click="goto(favorite.service_id)" />
          <br />
          <div class="inline2">
            <button class="btn" @click="deletefav(favorite._id)">Delete</button>
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
    document.title = "Favorites";
  },
  data() {
    return {
      services: [],
      favorites: []
    };
  },
  mounted() {
    this.getFavorites();
  },
  methods: {
    goto(id) {
      this.$router.push({ name: "ServiceCard", params: { id: id } });
    },
    getFavorites() {
      axios
        .post("https://reservo-r.herokuapp.com/fav/view_favorites", {
          id: localStorage.getItem("user-info")
        })
        .then(response => {
          this.favorites = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    deletefav(id) {
      axios
        .post("https://reservo-r.herokuapp.com/fav/deleteFavorite", {
          id: id
        })
        .catch(error => {
          console.log(error);
        });
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
  background-color: #f1f1f1;
  padding: 20px;
  font-family: Arial;
}
img{
  height: 300px;
}

.card {
  background-color: white;
  padding: 20px;
  margin-top: 20px;
}

.inline2 {
  display: inline-block;
  border-bottom: 1px solid;
}

.row {
  margin: 8px -16px;
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

.inline2 {
  display: inline-block;
}

button {
  background-color: darkred;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}
button:hover {
  opacity: 1;
}

.leftcolumn {
  margin: 100px auto 0;
  width: 400px;
  height: 600px;
  perspective: 700px;
  float: left;
}
</style>

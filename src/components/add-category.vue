<template>
  <div class="container">
    <h1>Categories Page</h1>
    <hr />
    <br />
    <input type="text" placeholder="Add Category" name="name" id="name" v-model="form.name" />
    <button @click="add_category()" class="registerbtn">Add Category</button>
    <hr />
    <h3>Categories Available</h3>
    <div v-for="category in categories" :key="category.id" class="card">
      <div class="fakeimg">
        <h4>{{ category.name }}</h4>
        <button class="deletebtn" @click="deletecategory(category._id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    document.title = "Add Category"
  },
  data() {
    return {
      form: {
        name: ""
      },
      categories: []
    };
  },
  mounted() {
    this.get_categories();
  },
  methods: {
    async add_category() {
      await axios.post("https://reservo-r.herokuapp.com/add_category", {
        name: this.form.name
      });
      this.$router.go()
    },
    get_categories() {
      axios
        .get("https://reservo-r.herokuapp.com/categories")
        .then(response => {
          this.categories = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    deletecategory(id){
        axios
        .post("https://reservo-r.herokuapp.com/categories/delete",{
          id: id
        })
        this.$router.go()
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

.fakeimg {
  background-color: lightgrey;
  width: 100%;
  padding: 20px;
}

.card {
  background-color: white;
  padding: 20px;
  margin-top: 20px;
}

input[type="text"] {
  width: 50%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="text"]:focus {
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
  width: 20%;
  opacity: 0.9;
}

.registerbtn:hover {
  opacity: 1;
}

.deletebtn {
  background-color: darkred;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 20%;
  opacity: 0.9;
}

.deletebtn:hover {
  opacity: 1;
}

a {
  color: dodgerblue;
}
</style>
<template>
  <div class="container">
    <h1>Service Proposal</h1>
    <p>Please fill in this form to propose a service.</p>
    <hr />

    <label for="name">
      <b>Name</b>
    </label>
    <br />
    <input type="text" placeholder="Enter Name" name="name" id="name" v-model="form.name" />
    <br />

    <label for="image">
      <b>Image</b>
    </label>
    <br />
    <input type="file" id="file" ref="myFiles" @change="previewFiles" multiple />
    <br />

    <label for="description">
      <b>Description</b>
    </label>
    <br />
    <input type="text" placeholder="Enter description" name="description" id="description" v-model="form.description" />
    <br />

    <label for="price">
      <b>Price</b>
    </label>
    <br />
    <input type="text" placeholder="Enter price" name="price" id="price" min="0.01" step="0.01" v-model="form.price" />
    <br />

    <label for="address">
      <b>Address</b>
    </label>
    <br />
    <input type="text" placeholder="Enter Address" name="address" id="address" v-model="form.address" />
    <br />

    <label for="category">
      <b>Category</b>
    </label>
    <br />

    <select name="category" id="category" v-model="form.category">
      <option disabled value>Please Select Category</option>
      <option v-for="category in categories" :value="category.name" :key="category.name">{{ category.name }}</option>
    </select>

    <hr />
    <button @click="submit()" class="submitbtn">Submit</button>
  </div>
</template>

<script>
import axios from "axios";
import { storage } from "../../firebase.js";
import { ref, uploadBytesResumable } from "firebase/storage";
export default {
  created() {
    document.title = "Propose Service"
  },
  data() {
    return {
      form: {
        name: "",
        image: null,
        description: "",
        price: "",
        address: "",
        category: "",
        bank_number: "",
        user_id: ""
      },
      errors: [],
      categories: [],
      files: []
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    submit() {
      console.log("image in form ", this.form.image);
      if(this.form.image == null){
        window.alert("You must add an image for the service")
        this.$router.push("/");
      }
      const storageref = ref(storage, `/images/${this.form.image}`);
      let uploadimage = uploadBytesResumable(storageref, this.form.image);
      uploadimage.on(
        "state_changed",
        () => {
          console.log("in progress");
        },
        error => {
          console.log("error");
          console.log(error);
        },
        () => {
          console.log("uploading");
          storage
            .ref("images")
            .child(this.form.image)
            .getDownloadURL()
            .then(url => {
              console.log("image url ", url);
              axios.post("https://resservo.herokuapp.com/services/propose_service", {
                name: this.form.name,
                image: url,
                description: this.form.description,
                price: this.form.price,
                address: this.form.address,
                category: this.form.category,
                bank_number: this.form.bank_number,
                user_id: localStorage.getItem("user-info")
              });
            });
        }
      );
      this.$router.push("/");
    },
    getCategories() {
      axios
        .get("https://resservo.herokuapp.com/categories")
        .then(response => {
          this.categories = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    previewFiles() {
      this.files = this.$refs.myFiles.files;
      this.form.image = this.files[0].name;
      console.log("image form ", this.form.image);
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
input[type="file"],
select,
option {
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

.submitbtn {
  background-color: #4d4c7d;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 50%;
  opacity: 0.9;
}

.submitbtn:hover {
  opacity: 1;
}

a {
  color: dodgerblue;
}
</style>
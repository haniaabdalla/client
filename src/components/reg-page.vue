<template>
  <div class="container">
    <h1>Register</h1>
    <p>Please fill in this form to create an account.</p>
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
    <input type="password" placeholder="Enter Password (minimum 6 characters)" name="pswd" id="pswd"
      v-model="form.pswd" />
    <br />

    <label for="bank_number">
      <b>Bank number</b>
    </label>
    <br />
    <input type="text" placeholder="Enter Your Bank Number" name="bank_number" id="bank_number"
      v-model="form.bank_number" />
    <br />

    <label for="image">
      <b>Image</b>
    </label><br>
    <input type="file" id="file" ref="myFiles" @change="previewFiles" multiple />
    <br>

    <label for="type">
      <b>Account Type</b>
    </label>
    <br />
    <select name="type" id="type" placeholder="Select Account Type" v-model="form.type">
      <option disabled value>Please Select Account Type</option>
      <option value="Customer">Customer</option>
      <option value="Service Provider">Service Provider</option>
    </select>

    <hr />

    <button @click="register()" class="registerbtn">Register</button>
    <p>
      Already have an account?
      <router-link to="/login" class="text-2xl underline hover:text-blue-500 transision">Login</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";
import { storage } from "../../firebase.js"
import { ref, uploadBytesResumable } from "firebase/storage"
export default {
  created() {
    document.title = "Register"
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        name: "",
        phone: "",
        type: "",
        image: null
      },
      errors: [],
      files: []
    };
  },
  methods: {
    register() {
      console.log("image in form ", this.form.image);
      if(this.form.image == null){
        this.form.image = "http://dummyimage.com/177x100.png/dddddd/000000"
      }
      const storageref = ref(storage, `/images/${this.form.image}`)
      let uploadimage = uploadBytesResumable(storageref, this.form.image)
      uploadimage.on("state_changed", () => {
        console.log("in progress");
      }, (error) => {
        console.log("error");
        console.log(error);
      }, () => {
        console.log("uploading");
        storage.ref("images").child(this.form.image).getDownloadURL().then((url) => {
          console.log("image url ", url);
          axios
            .post("https://reservo-r.herokuapp.com/user/register", {
              email: this.form.email,
              password: this.form.pswd,
              name: this.form.name,
              phone: this.form.phone,
              type: this.form.type,
              image: url
            })
            .then(response => {
              if (response.data == "Email already exists.") {
                window.alert("Email already exists.");
                this.$router.push("/register");
              } else {
                this.$router.push("/login");
              }
            })
        })
      })
    },
    previewFiles() {
      this.files = this.$refs.myFiles.files
      this.form.image = this.files[0].name
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
input[type="password"],
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
input[type="password"]:focus,
input[type="file"]:focus,
option:focus,
select:focus {
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

 
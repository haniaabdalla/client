<template>
  <div class="container">
    <h1>Working Hours</h1>
    <p>Please fill in this form to create working hours for your service.</p>
    <hr />
    <label for="day">
      <b>Day</b>
    </label>
    <br />
    <select name="day" id="day" placeholder="Select the day" v-model="form.day">
      <option disabled value>Please select the day</option>
      <option value="Saturday">Saturday</option>
      <option value="Sunday">Sunday</option>
      <option value="Monday">Monday</option>
      <option value="Tuesday">Tuesday</option>
      <option value="Wednesday">Wednesday</option>
      <option value="Thursday">Thursday</option>
      <option value="Friday">Friday</option>
    </select>
    <br />

    <label for="from">
      <b>From</b>
    </label>
    <br />
    <input type="time" placeholder="from" name="from" id="from" v-model="form.from" />
    <br />
    <label for="to">
      <b>To</b>
    </label>
    <br />
    <input type="time" placeholder="to" name="to" id="to" v-model="form.to" />

    <hr />
    <button @click="submit()" class="registerbtn">Submit</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    document.title = "Working Hours";
  },
  props: ["id"],
  data() {
    return {
      form:{
        day: "",
      from: "",
      to: "",
      },
      
      errors: []
    };
  },
  methods: {
    submit() {
      axios.post("https://reservo-r.herokuapp.com/hours/add_hours", {
        day: this.day,
        from: this.from,
        to: this.to,
        id: this.$route.params.id
      });
      this.$router.push("/my_services");
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

 
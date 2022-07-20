<template>
  <div class="container">
    <div class="card">
      <h2>Checkout</h2>
      <hr />
      <div class="container">
        <label for="type">
          <b>Payment Type:</b>
        </label>
        <br />
        <select name="type" placeholder="Select Payment Type" v-model="type">
          <option disabled value>Please Select Payment Type</option>
          <option value="Pay Deposite">Pay Deposite</option>
          <option value="Pay Total Price">Pay Total Price</option>
        </select>
      </div>
      <label><b>Total Price:</b> £ {{ reservation.total_price }}</label>
      <label><b>Deposite:</b>£ {{ this.getDeposite(reservation.total_price) }}</label>

      <label><b>Bank number to transfer:</b> {{ user.bank_number }}</label>
      <div class="inline2">
        <button @click="pay()" class="submitbtn">Pay</button>
        <button @click="cancel()" class="deletebtn">Cancel</button>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    document.title = "Checkout";
  },
  props: ["id"],
  data() {
    return {
      type: '',
      errors: [],
      reservation: [],
      service: [],
      user: []
    };
  },

  mounted() {
    this.GetReservation();
  },
  methods: {
    getDeposite(price) {
      const total_price = (price * 0.3);
      return total_price
    },
    GetReservation() {
      axios
        .post("https://reservo-r.herokuapp.com/reservation/view_reservation", {
          id: this.$route.params.id
        })
        .then(response => {
          this.reservation = response.data;
          return this.getService();
        })
        .catch(error => {
          console.log(error);
        });
    },
    getService() {
      axios
        .post("https://reservo-r.herokuapp.com/services/service", {
          id: this.reservation.service_id
        })
        .then(response => {
          this.service = response.data;
          return this.viewInfo();
        })
        .catch(error => {
          console.log(error);
        });
    },
    viewInfo() {
      axios
        .post("https://reservo-r.herokuapp.com/user/info", {
          id: this.service.user_id
        })
        .then(response => {
          this.user = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    cancel() {
      axios
        .post("https://reservo-r.herokuapp.com/reservation/delete_reservation", {
          id: this.$route.params.id
        })
      this.$router.push("/")
    },
    pay() {
      axios
        .post("https://reservo-r.herokuapp.com/pay/pay", {
          res_id: this.$route.params.id,
          type: this.type,
          total_price: this.reservation.total_price,
          bank_number: this.user.bank_number,
        })
      this.$router.push("/")
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

.deletebtn {
  background-color: darkred;
  margin-left: 20px;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.deletebtn:hover {
  opacity: 1;
}

.submitbtn {
  background-color: darkgreen;
  margin-right: 20px;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.submitbtn:hover {
  opacity: 1;
}

a {
  color: dodgerblue;
}

.inline2 {
  display: inline-block;
}

.card {
  background-color: white;
  padding: 20px;
  margin-top: 20px;
}
</style>
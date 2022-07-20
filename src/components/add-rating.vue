<template>
  <div>
    <div class="feedback">
      <h3>Rating</h3>
      <p>
        <br />Please spare some moments to give us your valuable feedback as it will help us in improving our service.
      </p>
      <hr />
      <label for="rating">Rating</label>

      <div class="rate">
        <input type="radio" id="star5" name="rate" value="5" v-model="ratings" />
        <label for="star5" title="text">5 stars</label>
        <input type="radio" id="star4" name="rate" value="4" v-model="ratings" />
        <label for="star4" title="text">4 stars</label>
        <input type="radio" id="star3" name="rate" value="3" v-model="ratings" />
        <label for="star3" title="text">3 stars</label>
        <input type="radio" id="star2" name="rate" value="2" v-model="ratings" />
        <label for="star2" title="text">2 stars</label>
        <input type="radio" id="star1" name="rate" value="1" v-model="ratings" />
        <label for="star1" title="text">1 star</label>
      </div>
      <br />
      <label for="review">Review</label>
      <br />
      <input type="text" id="review" name="review" v-model="form.review" />
      <br />
      <button @click="rate()">Submit</button>
      <br />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    document.title = "Add Rating"
  },
  props: ["id"],
  data() {
    return {
      form: {
        rating: "",
        review: ""
      },
      reservations: [],
      checking: true,
      ratings: ""
    };
  },
  mounted() {
    this.check();
  },
  methods: {
    rate() {
      axios
        .post("https://reservo-r.herokuapp.com/rating/AddRatingAndReview", {
          rating: this.ratings,
          review: this.form.review,
          ServiceID: this.$route.params.id,
          user_id: localStorage.getItem("user-info")
        })
        .catch(error => {
          console.log(error);
        });
      this.$router.push("/history");
    },
    check() {
      axios
        .post("https://reservo-r.herokuapp.com/rating/ViewUserRating", {
          user_id: localStorage.getItem("user-info"),
          service_id: this.$route.params.id
        })
        .then(response => {
          this.checking = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
      return this.checking;
    }
  }
};
</script>

<style scoped>
.feedback {
  width: 100%;
  max-width: 780px;
  background: #fff;
  margin: 0 auto;
  padding: 15px;
  box-shadow: 1px 1px 16px rgba(0, 0, 0, 0.3);
}

.feedback input,
.feedback form textarea {
  width: 50%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

.rate {
  float: center;
  height: 46px;
  padding: 0 10px;
}

.rate:not(:checked)>input {
  position: absolute;
  top: -9999px;
}

.rate:not(:checked)>label {
  float: center;
  width: 1em;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  font-size: 30px;
  color: #ccc;
  align-self: center;
}

.rate:not(:checked)>label:before {
  content: "★ ";
}

.rate>input:checked~label {
  color: #ffc700;
}

.rate:not(:checked)>label:hover,
.rate:not(:checked)>label:hover~label {
  color: #deb217;
}

.rate>input:checked+label:hover,
.rate>input:checked+label:hover~label,
.rate>input:checked~label:hover,
.rate>input:checked~label:hover~label,
.rate>label:hover~input:checked~label {
  color: #c59b08;
}

button {
  background-color: #4d4c7d;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 20%;
  opacity: 0.9;
}
</style>
<template>
  <div v-if="!notifications.length">
  <br><br>
    <h2><b>There are no notifications..</b></h2>
  </div>
  <div v-else>
    <div class="container">
      <h3>Notifications</h3>
      <hr />
      <div v-for="notification in all" :key="notification.id" class="card">
        <div class="fakeimg">
          <p>{{ notification.notification }}</p>
        </div>
      </div>
      <div v-for="notification in notifications" :key="notification.id" class="card">
        <div class="fakeimg">
          <p>{{ notification.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  created() {
    document.title = "Notifications"
  },
  data() {
    return {
      notifications: [],
      all: []
    };
  },
  mounted() {
    this.get_notifications();
    this.get_all()
  },
  methods: {
    get_notifications() {
      axios
        .post("https://reservo-r.herokuapp.com/notify/notify", {
          user_id: localStorage.getItem("user-info")
        })
        .then(response => {
          this.notifications = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    get_all() {
      axios
        .get("https://reservo-r.herokuapp.com/notify/notifyall")
        .then(response => {
          this.all = response.data;
        })
        .catch(error => {
          console.log(error);
        });
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
  float: center;

}

.fakeimg {
  background-color: white;
  width: 100%;
  padding: 20px;
}

.card {
  background-color: white;
  padding: 20px;
  margin-top: 20px;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}
</style>
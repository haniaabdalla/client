<script>

export default {
  created() {
    document.title = "Logout"
  },
  mounted() {
    this.logout();
  },
  methods: {
    logout() {
      localStorage.removeItem('user-info');
      this.$router.push("/login");
    }
  }
};
</script>
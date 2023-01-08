<template>
  <div class="card p-3 login-container">
    <form @submit.prevent="login()">
      <div class="mb-3">
        <label for="inputEmail1" class="form-label">Email address</label>
        <input
          id="inputEmail1"
          v-model="user.email"
          type="email"
          class="form-control"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="inputPassword1" class="form-label">Password</label>
        <input
          id="inputPassword1"
          v-model="user.password"
          type="password"
          class="form-control"
        />
      </div>
      <div class="d-grid mx-auto text-center">
        <button type="submit" class="btn btn-primary">Submit</button>
        <p class="mt-3">
          <NuxtLink to="/signup">Don't have an account?</NuxtLink>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async login() {
      try {
        await this.$axios.post('users/login', this.user);
        this.$router.push('/');
      } catch (e) {
        alert('Invalid user name or password');
      }
    },
  },
};
</script>

<style scoped lang="scss">
.login-container {
  width: 350px;
  margin: 100px auto;
}
</style>

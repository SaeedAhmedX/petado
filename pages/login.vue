<template>
  <div class="card p-3 login-container">
    <form>
      <div class="mb-3">
        <label for="inputEmail1" class="form-label">Email address</label>
        <input
          id="inputEmail1"
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
        <input id="inputPassword1" type="password" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.login-container {
  width: 350px;
  margin: 100px auto;
}
</style>

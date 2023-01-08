<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-between mb-5 mt-2">
      <h3>Councillors</h3>
    </div>

    <div class="d-flex councillor-form mb-5">
      <div class="r-5">
        <form @submit.prevent="checkUserInfo">
          <div class="mb-3">
            <label for="inputEmail" class="form-label">Email</label>
            <input
              id="inputEmail1"
              v-model="councillor.email"
              type="email"
              class="form-control"
              aria-describedby="email"
            />
          </div>
          <div class="mb-3">
            <label for="inputWardNumber" class="form-label">Ward Number</label>
            <input
              id="inputWardNumber"
              v-model="councillor.wardNumber"
              type="text"
              class="form-control"
              aria-describedby="wardNumber"
            />
          </div>
          <div class="d-grid mx-auto text-center">
            <button type="submit" class="btn btn-primary">Check User</button>
          </div>
        </form>
      </div>
      <div v-if="!!checkUser" class="user-info">
        <strong>Email is associated to</strong>
        <ul>
          <li>
            <p class="lab">Name</p>
            <p class="inf">{{ checkUser.user.name }}</p>
          </li>
          <li>
            <p class="lab">Address</p>
            <p class="inf">{{ checkUser.user.address }}</p>
          </li>
          <li>
            <p class="lab">Mobile</p>
            <p class="inf">{{ checkUser.user.mobile }}</p>
          </li>
        </ul>
        <p v-if="checkUser.message" class="text-danger">
          {{ checkUser.message }}
        </p>
        <p v-else class="text-info">
          Are you sure you want to assign this ward
          {{ checkUser.inputs.wardNumber }} to the above user
        </p>
        <button type="submit" class="btn btn-danger" @click="confirm">
          Yes
        </button>
        <button type="submit" class="btn" @click="cancel">No</button>
      </div>
    </div>

    <div class="councillor-list">
      <table class="table table-sm">
        <thead>
          <tr>
            <th scope="col">Ward Number</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Mobile</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in councillors" :key="user.id">
            <td>{{ user.councillor.wardNumber }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.address }}</td>
            <td>{{ user.mobile }}</td>
            <td>{{ user.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'home',
  data() {
    return {
      councillors: [],
      councillor: {
        email: '',
        wardNumber: '',
      },
      checkUser: null,
    };
  },
  async mounted() {
    await this.getCouncillors();
  },
  methods: {
    async checkUserInfo() {
      try {
        const result = await this.$axios.post(
          '/councillors/checkcoucillorstatus',
          this.councillor
        );
        this.checkUser = result.data.data;
      } catch (e) {
        alert('Something went wrong, please try again');
      }
    },
    async confirm() {
      try {
        await this.$axios.post(
          '/councillors/checkcoucillorstatus/force',
          this.checkUser.inputs
        );
        this.cancel();
        await this.getCouncillors();
      } catch (e) {
        alert('Something went wrong, please try again');
      }
    },
    cancel() {
      this.checkUser = null;
      this.councillor = {
        email: '',
        wardNumber: '',
      };
    },
    async getCouncillors() {
      const result = await this.$axios.get('councillors');
      this.councillors = result.data.data;
    },
  },
};
</script>

<style scoped lang="scss">
.councillor-list {
  table {
    thead {
      th {
        background-color: transparent;
      }
    }
  }
}

.user-info {
  background-color: white;
  border-radius: 16px;
  padding: 16px;
  margin-left: 32px;
  min-width: 500px;

  ul {
    list-style-type: none;
    width: 100%;
    padding: 0;
    margin: 0;

    li {
      width: 100%;
      padding: 0;
      margin: 0;

      .lab {
        text-transform: uppercase;
        font-weight: bold;
        font-size: 10px;
        color: #777;
        margin-bottom: 0;
      }
      .inf {
        font-size: 14px;
      }
    }
  }

  button {
    margin-right: 10px;
  }
}
</style>

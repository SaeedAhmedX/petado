<template>
  <div class="card p-3 signup-container">
    <h3>Signup</h3>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(signup)">
        <div class="mb-3">
          <ValidationProvider
            v-slot="{ errors }"
            name="Full Name"
            rules="required"
          >
            <label for="inputFullName" class="form-label">Full Name *</label>
            <input
              id="inputFullName"
              v-model="user.name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.length }"
            />
            <p v-if="errors && errors.length" class="invalid-feedback">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>

        <div class="mb-3">
          <ValidationProvider
            v-slot="{ errors }"
            name="Address"
            rules="required"
          >
            <label for="inputAddress" class="form-label">Address *</label>
            <textarea
              id="inputAddress"
              v-model="user.address"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.length }"
            />
            <p v-if="errors && errors.length" class="invalid-feedback">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>

        <div class="mb-3">
          <ValidationProvider
            v-slot="{ errors }"
            name="Mobile Number"
            rules="required"
          >
            <label for="inputMobile" class="form-label">Mobile Number *</label>
            <input
              id="inputMobile"
              v-model="user.mobile"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.length }"
            />
            <p v-if="errors && errors.length" class="invalid-feedback">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>

        <div class="mb-3">
          <ValidationProvider
            v-slot="{ errors }"
            name="Gender"
            rules="required"
          >
            <label for="genderGroup" class="form-label">Gender *</label>
            <div id="genderGroup">
              <div class="form-check">
                <input
                  id="radioGenderMale"
                  v-model="user.gender"
                  value="MALE"
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                />
                <label class="form-check-label" for="radioGenderMale">
                  Male
                </label>
              </div>
              <div class="form-check">
                <input
                  id="radioGenderFemale"
                  v-model="user.gender"
                  value="FEMALE"
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                />
                <label class="form-check-label" for="radioGenderFemale">
                  Female
                </label>
              </div>
            </div>
            <p v-if="errors && errors.length" class="invalid-feedback">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>

        <div class="mb-3">
          <ValidationProvider
            v-slot="{ errors }"
            name="Profession"
            rules="required"
          >
            <label for="inputProfession" class="form-label">Profession *</label>
            <input
              id="inputProfession"
              v-model="user.profession"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.length }"
            />
            <p v-if="errors && errors.length" class="invalid-feedback">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>

        <hr />
        <div class="mb-3">
          <ValidationProvider
            v-slot="{ errors }"
            name="Email Address"
            rules="required|email"
          >
            <label for="inputEmail1" class="form-label">Email address</label>
            <input
              id="inputEmail1"
              v-model="user.email"
              type="email"
              class="form-control"
              aria-describedby="emailHelp"
              :class="{ 'is-invalid': errors && errors.length }"
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
            <p v-if="errors && errors.length" class="invalid-feedback">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>

        <div class="mb-3">
          <ValidationProvider
            v-slot="{ errors }"
            name="Password"
            rules="required|min:8"
          >
            <label for="inputPassword1" class="form-label">Password *</label>
            <input
              id="inputPassword1"
              v-model="user.password"
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.length }"
            />
            <p v-if="errors && errors.length" class="invalid-feedback">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>

        <div class="mb-3">
          <ValidationProvider
            v-slot="{ errors }"
            name="Repeat Password"
            rules="required|min:8"
          >
            <label for="inputPassword1" class="form-label"
              >Repeat Password *</label
            >
            <input
              id="inputPassword1"
              v-model="password2"
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.length }"
            />
            <p v-if="errors && errors.length" class="invalid-feedback">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        address: '',
        mobile: '',
        gender: '',
        profession: '',
      },
      password2: '',
    };
  },
  methods: {
    async signup() {
      await this.$axios.post('user', this.user);
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped lang="scss">
.signup-container {
  width: 500px;
  margin: 100px auto;
}
</style>

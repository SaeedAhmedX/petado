<template>
  <div class="card p-3 signup-container">
    <h3>Complaint</h3>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(sendRequest)">
        <div class="mb-3">
          <ValidationProvider
            v-slot="{ errors }"
            name="Complaint Description"
            rules="required"
          >
            <label for="inputFullName" class="form-label"
              >Complaint Description *</label
            >
            <textarea
              id="inputDescription"
              v-model="complaint.description"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.length }"
            />
            <p v-if="errors && errors.length" class="invalid-feedback">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>

        <div class="dogs-header">
          <p>Dogs</p>
          <button class="btn btn-primary" @click="addDog">+</button>
        </div>
        <hr />

        <div class="dogs-list">
          <div class="dog" v-for="(dog, index) in complaint.dogs">
            <p>#{{ index + 1 }}</p>

            <div class="mb-3">
              <ValidationProvider v-slot="{ errors }" name="Registration Id">
                <label :for="`inputRegistrationId${index}`" class="form-label"
                  >Registration Id</label
                >
                <input
                  :id="`inputRegistrationId${index}`"
                  v-model="dog.registerationId"
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
                <label :for="`dogGenderGroup${index}`" class="form-label"
                  >Dog Gender *</label
                >
                <div :id="`dogGenderGroup${index}`">
                  <div class="form-check">
                    <input
                      :id="`radioDogGenderMale${index}`"
                      v-model="dog.gender"
                      value="MALE"
                      class="form-check-input"
                      type="radio"
                      :name="`dogGenderGroup${index}`"
                    />
                    <label
                      class="form-check-label"
                      :for="`radioDogGenderMale${index}`"
                    >
                      Male
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      :id="`radioDogGenderFemale${index}`"
                      v-model="dog.gender"
                      value="FEMALE"
                      class="form-check-input"
                      type="radio"
                      :name="`dogGenderGroup${index}`"
                    />
                    <label
                      class="form-check-label"
                      :for="`radioDogGenderFemale${index}`"
                    >
                      Female
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      :id="`radioDogGenderUnknown${index}`"
                      v-model="dog.gender"
                      value="UNKNOWN"
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                    />
                    <label
                      class="form-check-label"
                      :for="`radioDogGenderUnknown${index}`"
                    >
                      Unknown
                    </label>
                  </div>
                </div>
                <p v-if="errors && errors.length" class="invalid-feedback">
                  {{ errors[0] }}
                </p>
              </ValidationProvider>
            </div>

            <div class="mb-3">
              <ValidationProvider v-slot="{ errors }" name="Age">
                <label :for="`inputAge${index}`" class="form-label"
                  >Age (In Months)</label
                >
                <input
                  :id="`inputAge${index}`"
                  v-model="dog.age"
                  type="number"
                  class="form-control"
                  :class="{ 'is-invalid': errors && errors.length }"
                />
                <p v-if="errors && errors.length" class="invalid-feedback">
                  {{ errors[0] }}
                </p>
              </ValidationProvider>
            </div>

            <div class="mb-3">
              <ValidationProvider v-slot="{ errors }" name="Breed">
                <label :for="`inputBreed${index}`" class="form-label"
                  >Breed</label
                >
                <input
                  :id="`inputBreed${index}`"
                  v-model="dog.breed"
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
              <ValidationProvider v-slot="{ errors }" name="Color">
                <label :for="`inputColor${index}`" class="form-label"
                  >Color</label
                >
                <input
                  :id="`inputColor${index}`"
                  v-model="dog.color"
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
              <ValidationProvider v-slot="{ errors }" name="Dog Description">
                <label :for="`inputDogDescrition${index}`" class="form-label"
                  >Dog Description</label
                >
                <textarea
                  id="`inputDogDescription${index}`"
                  v-model="dog.description"
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
                name="Dog Type"
                rules="required"
              >
                <label :for="`dogType${index}`" class="form-label"
                  >Dog Type *</label
                >
                <div id="`dogType${index}`">
                  <div class="form-check">
                    <input
                      :id="`radioTypeStreet${index}`"
                      v-model="dog.type"
                      value="STREET"
                      class="form-check-input"
                      type="radio"
                      :name="`dogType${index}`"
                    />
                    <label class="form-check-label" for="radioTypeStreet">
                      Street
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      :id="`radioTypePet${index}`"
                      v-model="dog.type"
                      value="PET"
                      class="form-check-input"
                      type="radio"
                      :name="`DogType${index}`"
                    />
                    <label class="form-check-label" for="radioTypePet">
                      Pet
                    </label>
                  </div>
                </div>
                <p v-if="errors && errors.length" class="invalid-feedback">
                  {{ errors[0] }}
                </p>
              </ValidationProvider>
            </div>

            <div v-if="dog.type === 'PET'" class="mb-3">
              <ValidationProvider v-slot="{ errors }" name="Price">
                <label :for="`inputPrice${index}`" class="form-label"
                  >Price</label
                >
                <input
                  :id="`inputPrice${index}`"
                  v-model="dog.price"
                  type="number"
                  class="form-control"
                  :class="{ 'is-invalid': errors && errors.length }"
                />
                <p v-if="errors && errors.length" class="invalid-feedback">
                  {{ errors[0] }}
                </p>
              </ValidationProvider>
            </div>
            <hr />
          </div>
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
      complaint: {
        description: '',
        dogs: [],
      },
    };
  },
  methods: {
    async sendRequest() {
      await this.$axios.post('dog/request', this.complaint);
      this.$router.push('/');
    },
    getEmptyDog() {
      return {
        registerationId: '',
        gender: 'UNKNOWN',
        age: '',
        color: '',
        description: '',
        dogType: 'STREET',
        breed: '',
        price: '',
        images: [],
      };
    },
    addDog() {
      this.complaint.dogs.push(this.getEmptyDog());
    },
  },
};
</script>

<style scoped lang="scss">
.signup-container {
  width: 500px;
  margin: 100px auto;
}

.dogs-header {
  display: flex;

  & > p {
    flex-grow: 1;
  }
}
</style>
